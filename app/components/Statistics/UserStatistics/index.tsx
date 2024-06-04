import { Form, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormEvent, useMemo, useRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { SpaceInfoType } from "~/Services/space-controller/get-space-domain-by-id.server";
import {
  SpaceStatisticsMemberListCursorType,
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "~/Services/space-statistics-controller/space-statistics-controller.types";
import Search from "~/assets/icons/Search.svg?react";
import Sorting from "~/assets/icons/Sorting.svg?react";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import Loading from "~/components/Box/Loading";
import { TD, TH } from "~/components/Box/Table";
import TextInput from "~/components/Box/TextInput";
import { loader } from "~/routes/statistics.user.$id";
import { vars } from "~/styles/vars.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
import { spaceRoleLabel } from "~/types/enum.types";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { statisticsSpaceStyle } from "../styles.css";

const columns = [
  { name: "유저ID", filterName: null },
  { name: "이름", filterName: null },
  { name: "이메일", filterName: null },
  { name: "유저타입", filterName: null },
  { name: "프롬프트 요청수", filterName: null },
  { name: "프롬프트 보기", filterName: null },
];

type QueryParamsType = {
  keyword: string;
  order: string;
  basis: string;
};

const getUserList = async (
  id: string,
  queryParams: StatisticsListCursorQueryParamsType
) => {
  queryParams = omitUnusedSearchParams(
    spaceListCursorQueryDefault,
    queryParams
  );
  const parsed = objectToQueryParams({ ...queryParams });
  const res = await fetch(`/api/get-user-statistics-list/${id}?${parsed}`, {
    cache: "no-cache",
  });
  return (await res.json()) as ApiResponseType<
    CursorResponse<SpaceStatisticsMemberListCursorType>
  >;
};

export default function UserStatistics() {
  const { id } = useParams<"id">();
  const { spaceId, spaceDomain } = useLoaderData<typeof loader>();
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
  const [spaceDomainData, setSpaceDomainData] = useState<SpaceInfoType>();
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["/user/list", id, parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getUserList(id!, {
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

  useMemo(() => {
    if (!spaceDomain) return;
    setSpaceDomainData(spaceDomain);
  }, [spaceDomain]);
  return (
    <>
      {loading && <Loading />}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={statisticsSpaceStyle.title}>
          {spaceDomainData?.name} 유저 통계
        </p>
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
      <Flex marginBottom={"16px"}>
        <p className={statisticsSpaceStyle.subTitle}>전체 유저 통계</p>
        <Div marginLeft={"auto"} display={"inherit"} gap={"4px"}>
          <Buttons
            backgroundColor={vars.colors["Primary/Primary 50"]}
            color={vars.colors["Primary/Primary 500"]}
            onClick={() => {
              navigate(`/statistics/space/${spaceId}`);
            }}
          >
            스페이스 통계 보기
          </Buttons>
          <Buttons
            backgroundColor={vars.colors["Primary/Primary 50"]}
            color={vars.colors["Primary/Primary 500"]}
            onClick={() => {
              navigate(`/statistics/prompt/${spaceId}`);
            }}
          >
            생성된 프롬프트 통계 보기
          </Buttons>
        </Div>
      </Flex>
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
                          if (column.filterName) {
                            handleFiltering(column.filterName);
                          }
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
                <TD>{item.memberName}</TD>
                <TD>{item.memberEmail}</TD>
                <TD>{item.roleType ? spaceRoleLabel[item.roleType] : "'"}</TD>
                <TD>{item.executeCount}</TD>
                <TD wrapSprinkles={{ display: "flex" }}>
                  {item.promptIdList?.length}개
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
