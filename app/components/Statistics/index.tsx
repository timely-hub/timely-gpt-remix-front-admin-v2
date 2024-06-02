import { Form, useLocation, useNavigate } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import Search from "~/assets/icons/Search.svg?react";
import Sorting from "~/assets/icons/Sorting.svg?react";
import { vars } from "~/styles/vars.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
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
import { statisticsSpaceStyle } from "./styles.css";
import {
  SpaceListCursorType,
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "~/Services/space-statistics-controller/space-statistics-controller.types";

const columns = [
  { name: "스페이스명", filterName: null },
  { name: "도메인", filterName: null },
  { name: "멤버 수", filterName: "memberCount" },
  { name: "프롬프트 수", filterName: "promptCount" },
  { name: "총 할당 토큰", filterName: null },
  { name: "총 사용 토큰", filterName: null },
  { name: "총 남은 토큰", filterName: null },
  { name: "만료일", filterName: "expiredAt" },
  { name: "통계보기", filterName: null },
];

type QueryParamsType = {
  keyword: string;
  order: string;
  basis: string;
};

const getSpaceList = async (
  queryParams: StatisticsListCursorQueryParamsType
) => {
  queryParams = omitUnusedSearchParams(
    spaceListCursorQueryDefault,
    queryParams
  );
  const parsed = objectToQueryParams({ ...queryParams });
  const res = await fetch(`/api/get-space-statistics-list?${parsed}`, {
    cache: "no-cache",
  });
  return (await res.json()) as ApiResponseType<
    CursorResponse<SpaceListCursorType>
  >;
};

export default function Statistics() {
  const pathname = useLocation().pathname;
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
      queryKey: ["/space/list", parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getSpaceList({
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
    console.log(name);
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
        <p className={statisticsSpaceStyle.title}>스페이스 선택</p>
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
          ref={virtuoso}
          data={itemList}
          components={{
            Table: ({ style, ...props }) => (
              <table {...props} style={{ ...style, width: "100%" }}></table>
            ),
          }}
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
                <TD>{item?.name}</TD>
                <TD>{item?.domain}</TD>
                <TD>{item?.memberCount}</TD>
                <TD>{item?.promptCount}</TD>
                <TD>{thousand(item?.credit)}</TD>
                <TD>{thousand(item?.usedCredit)}</TD>
                <TD>{thousand(item?.usableCredit)}</TD>
                <TD>{dayJsFormatter(item?.expiredAt)}</TD>
                <TD>
                  <Buttons
                    onClick={() => {
                      if (pathname === "/space/list") {
                        navigate(`/space/list/info/${item?.id}`);
                      } else {
                        if (pathname === "/statistics/space") {
                          navigate(`/statistics/space/${item?.id}`);
                        } else if (pathname === "/statistics/user") {
                          navigate(`/statistics/user/${item?.id}`);
                        } else {
                          navigate(`/statistics/prompt/${item?.id}`);
                        }
                      }
                    }}
                  >
                    {pathname === "/space/list" ? "자세히보기" : "통계보기"}
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
