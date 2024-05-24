import { useLocation, useNavigate } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import Search from "~/assets/icons/Search.svg?react";
import {
  SpaceListCursorQueryParamsType,
  SpaceListCursorType,
  spaceListCursorQueryDefault,
} from "~/services/space-statistics-controller/space-statistics-controller.types";
import { vars } from "~/styles/vars.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import Box from "../Box";
import Buttons from "../Box/Buttons";
import { TD, TH } from "../Box/Table";
import TextInput from "../Box/TextInput";
import { statisticsSpaceStyle } from "./styles.css";

type QueryParamsType = {
  toolName: string;
};

const getSpaceList = async (queryParams: SpaceListCursorQueryParamsType) => {
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
  const [parsedQueryParams, setParsedQueryParams] = useState<QueryParamsType>({
    toolName: "",
  });
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["/space/list", parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getSpaceList({
          cursor: pageParam?.toString() || "",
          ...parsedQueryParams,
        });
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
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={statisticsSpaceStyle.title}>스페이스 선택</p>
        <Buttons>전체 업데이트</Buttons>
      </Box>
      <TextInput
        placeholder={"검색어를 입력해주세요."}
        wrapSprinkles={{ width: "100%", marginBottom: "16px" }}
        suffix={
          <Buttons backgroundColor={"none"} type="submit">
            <Search />
          </Buttons>
        }
      />
      <div>
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
                <TH>스페이스명</TH>
                <TH>도메인</TH>
                <TH>멤버 수</TH>
                <TH>프롬프트 수</TH>
                <TH>총 할당 토큰</TH>
                <TH>총 사용 토큰</TH>
                <TH>총 남은 토큰</TH>
                <TH>만료일</TH>
                <TH>통계보기</TH>
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
                <TD>{item?.credit}</TD>
                <TD>{item?.usedCredit}</TD>
                <TD>{item?.usableCredit}</TD>
                <TD>{item?.expiredAt}</TD>
                <TD>
                  <Buttons
                    onClick={() => {
                      if (pathname === "/statistics/space") {
                        navigate(`/statistics/space/${item?.id}`);
                      } else if (pathname === "/statistics/user") {
                        navigate(`/statistics/user/${item?.id}`);
                      } else {
                        navigate(`/statistics/prompt/${item?.id}`);
                      }
                    }}
                  >
                    통계보기
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
