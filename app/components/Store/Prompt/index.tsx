import { Form, useNavigate } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useRef, useState } from "react";
import {
  StorePromptListQueryParamsType,
  StorePromptListType,
  storePromptListQueryDefault,
} from "~/Services/space-statistics-controller/space-statistics-controller.types";
import Box from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import Loading from "~/components/Box/Loading";
import TextInput from "~/components/Box/TextInput";
import { statisticsSpaceStyle } from "~/components/Statistics/styles.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import Search from "~/assets/icons/Search.svg?react";
import { TableVirtuoso } from "react-virtuoso";
import { vars } from "~/styles/vars.css";
import { TD, TH } from "~/components/Box/Table";
import Sorting from "~/assets/icons/Sorting.svg?react";

const columns = [
  { name: "프롬프트ID", filterName: null },
  { name: "유저ID", filterName: null },
  { name: "이름", filterName: null },
  { name: "설명", filterName: null },
  { name: "카테고리", filterName: null },
  { name: "조회수", filterName: "viewCount" },
  { name: "요청수", filterName: "executeCount" },
  { name: "생성일", filterName: null },
  { name: "관리", filterName: null },
];

type QueryParamsType = {
  keyword: string;
  order: string;
  basis: string;
};

const getStorePromptList = async (
  queryParams: StorePromptListQueryParamsType
) => {
  queryParams = omitUnusedSearchParams(
    storePromptListQueryDefault,
    queryParams
  );
  const parsed = objectToQueryParams({ ...queryParams });
  const res = await fetch(`/api/get-store-prompt-list?${parsed}`, {
    cache: "no-cache",
  });
  return (await res.json()) as ApiResponseType<
    CursorResponse<StorePromptListType>
  >;
};

export default function PromptManagementComponent() {
  const navigate = useNavigate();
  const virtuoso = useRef(null);
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    keyword: "",
    order: "desc",
    basis: "",
  });
  const [parsedQueryParams, setParsedQueryParams] = useState<QueryParamsType>({
    keyword: "",
    order: "desc",
    basis: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["store/prompt", parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getStorePromptList({
          cursor: pageParam?.toString() || "",
          ...parsedQueryParams,
        });
        setLoading(false);
        return res;
      },
      initialPageParam: null as number | null,
      getPreviousPageParam: (firstPage) => {
        return firstPage?.data?.paging.cursor || null;
      },
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.paging.cursor || null;
      },
    });

  const itemList = useMemo(() => {
    return data?.pages.map((page) => page?.data?.list ?? []).flat();
  }, [data]);
  const totalCount: number = useMemo(() => {
    const groupCounts = (data?.pages.map(
      (page) => page?.data?.list.length ?? []
    ) ?? []) as number[];
    return groupCounts.reduce((acc, cur) => acc + cur, 0);
  }, [data]);

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>,
    newQueryParams?: QueryParamsType
  ) => {
    e?.preventDefault();
    const clonedQueryParams = newQueryParams ?? queryParams;
    if (newQueryParams) setQueryParams(clonedQueryParams);
    setParsedQueryParams({
      ...clonedQueryParams,
    });
  };

  const handleFiltering = (name: string) => {
    setParsedQueryParams((prev) => ({
      ...prev,
      basis: name,
      order: prev.order === "desc" ? "asc" : "desc",
    }));
  };
  return (
    <>
      {loading && <Loading />}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={statisticsSpaceStyle.title}>스토어 프롬프트 목록</p>
        <Buttons
          onClick={() => {
            refetch();
            setLoading(true);
          }}
        >
          전체 업데이트
        </Buttons>
      </Box>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <TextInput
          placeholder={"검색어를 입력해주세요."}
          wrapSprinkles={{ width: "100%", marginBottom: "16px" }}
          onChange={(e) => {
            setQueryParams((prev) => ({
              ...prev,
              keyword: e.target.value,
            }));
          }}
          suffix={
            <Buttons backgroundColor={"none"} type="submit">
              <Search />
            </Buttons>
          }
        />
      </Form>
      <div className={loading ? statisticsSpaceStyle.loading : ""}>
        <TableVirtuoso
          style={{
            height: "400px",
            maxHeight: "400px",
            border: "none",
            borderBottom: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
            width: "100%",
            borderCollapse: "collapse",
            borderSpacing: "0",
            textAlign: "left",
            tableLayout: "fixed",
            marginBottom: "24px",
          }}
          components={{
            Table: ({ style, ...props }) => (
              <table {...props} style={{ ...style, width: "100%" }}></table>
            ),
          }}
          ref={virtuoso}
          data={itemList}
          fixedHeaderContent={() => {
            return (
              <tr>
                {columns.map((column) => (
                  <TH theme="flex" key={column.name}>
                    {column.name}
                    {column.filterName && (
                      <Sorting
                        cursor={"pointer"}
                        onClick={() => {
                          handleFiltering(column.filterName);
                        }}
                      />
                    )}
                  </TH>
                ))}
              </tr>
            );
          }}
          itemContent={(_, item) => {
            return (
              <>
                <TD>{item.id}</TD>
                <TD>{item.authorId}</TD>
                <TD>{item.name}</TD>
                <TD>{item.description}</TD>
                <TD>{item.categoryId}</TD>
                <TD>{item.viewCount}</TD>
                <TD>{item.executeCount}</TD>
              </>
            );
          }}
          endReached={() => {
            !isFetchingNextPage && hasNextPage && fetchNextPage();
          }}
          totalCount={totalCount}
        ></TableVirtuoso>
      </div>
    </>
  );
}
