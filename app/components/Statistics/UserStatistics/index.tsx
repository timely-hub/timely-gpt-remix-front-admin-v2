import { useParams } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import Search from "~/assets/icons/Search.svg?react";
import Box from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import { TD, TH } from "~/components/Box/Table";
import TextInput from "~/components/Box/TextInput";
import {
  SpaceStatisticsMemberListCursorType,
  UserListCursorQueryParamsType,
  userListCursorQueryDefault,
} from "~/services/space-statistics-controller/space-statistics-controller.types";
import { vars } from "~/styles/vars.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { statisticsSpaceStyle } from "../styles.css";

type QueryParamsType = {
  userName: string;
};

const getUserList = async (
  id: string,
  queryParams: UserListCursorQueryParamsType
) => {
  queryParams = omitUnusedSearchParams(userListCursorQueryDefault, queryParams);
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
  const virtuoso = useRef(null);
  const [parsedQueryParams, setParsedQueryParams] = useState<QueryParamsType>({
    userName: "",
  });
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["/user/list", id, parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getUserList(id!, {
          cursor: pageParam?.toString() || "",
          ...parsedQueryParams,
        });
        console.log(res);
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
        <p className={statisticsSpaceStyle.title}>헤이GPT 유저 통계</p>
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
                <TH>유저ID</TH>
                <TH>이름</TH>
                <TH>이메일</TH>
                <TH>유저타입</TH>
                <TH>프롬프트 요청수</TH>
                <TH>프롬프트 보기</TH>
              </tr>
            );
          }}
          itemContent={(_, item) => {
            return (
              <>
                <TD>{item.id}</TD>
                <TD>{item.memberName}</TD>
                <TD>{item.memberEmail}</TD>
                <TD>{item.roleType}</TD>
                <TD>{item.promptCount}</TD>
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
