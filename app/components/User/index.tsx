import { Form, useNavigate } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { UserListCursorType } from "~/Services/space-statistics-controller/space-statistics-controller.types";
import Search from "~/assets/icons/Search.svg?react";
import Sorting from "~/assets/icons/Sorting.svg?react";
import { vars } from "~/styles/vars.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
import {
  DefaultTableListCursorQueryParamsType,
  defaultTableListCursorQueryDefault,
  spaceRoleLabel,
} from "~/types/shared.types";
import { dayJsFormatter } from "~/utils/formatter";
import {
  objectToQueryParams,
  omitUnusedSearchParams,
  thousand,
} from "~/utils/helpers";
import Box from "../Box";
import Buttons from "../Box/Buttons";
import Loading from "../Box/Loading";
import { TD, TH } from "../Box/Table";
import TextInput from "../Box/TextInput";
import { statisticsSpaceStyle } from "../Statistics/styles.css";

const columns = [
  { name: "유저 ID", filterName: null },
  { name: "이름", filterName: null },
  { name: "이메일", filterName: null },
  { name: "스페이스", filterName: null },
  { name: "유저타입", filterName: null },
  { name: "프롬프트 요청수", filterName: "promptExecutedCount" },
  { name: "최근 접속", filterName: "lastAccessedAt" },
  { name: "관리", filterName: null },
];

type QueryParamsType = {
  keyword: string;
  order: string;
  basis: string;
};

const getUserList = async (
  queryParams: DefaultTableListCursorQueryParamsType
) => {
  queryParams = omitUnusedSearchParams(
    defaultTableListCursorQueryDefault,
    queryParams
  );
  const parsed = objectToQueryParams({ ...queryParams });
  const res = await fetch(`/api/get-user-list?${parsed}`, {
    cache: "no-cache",
  });
  return (await res.json()) as ApiResponseType<
    CursorResponse<UserListCursorType>
  >;
};

export default function UserListComponent() {
  const navigate = useNavigate();
  const virtuoso = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
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

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["user/list", parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getUserList({
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
        <p className={statisticsSpaceStyle.title}>전체 유저 목록</p>
        <Buttons
          size={"small"}
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
                <TD>{item.name}</TD>
                <TD>{item.email}</TD>
                <TD>{item.spaceName}</TD>
                <TD>
                  {item.spaceMemberRoleType
                    ? spaceRoleLabel[item.spaceMemberRoleType]
                    : ""}
                </TD>
                <TD>{thousand(item.promptExecutedCount)}</TD>
                <TD>{dayJsFormatter(item.lastAccessedAt)}</TD>
                <TD>
                  <Buttons
                    theme={"primaryFilled"}
                    size={"small"}
                    padding={"6px 12px"}
                    onClick={() => {
                      navigate(`/user/list/info/${item.id}`);
                    }}
                  >
                    자세히 보기
                  </Buttons>
                </TD>
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
