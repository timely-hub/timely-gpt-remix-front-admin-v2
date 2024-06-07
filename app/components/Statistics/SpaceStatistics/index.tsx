import { useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { SpaceInfoType } from "~/Services/space-controller/get-space-domain-by-id.server";
import {
  SpaceStatisticsMemberListCursorType,
  SpaceStatisticsPromptListCursorType,
  SpaceStatisticsTokenUsageType,
} from "~/Services/space-statistics-controller/space-statistics-controller.types";
import Sorting from "~/assets/icons/Sorting.svg?react";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import Loading from "~/components/Box/Loading";
import { TD, TH, Table } from "~/components/Box/Table";
import { loader } from "~/routes/statistics.space.$id";
import { vars } from "~/styles/vars.css";
import { dayJsFormatter } from "~/utils/formatter";
import { thousand } from "~/utils/helpers";
import { statisticsSpaceStyle } from "../styles.css";
import { recentStatisticsStyle } from "./styles.css";

const recentUserColumn = [
  { name: "이름", filterName: null },
  { name: "유저ID", filterName: null },
  { name: "이메일", filterName: null },
  { name: "스페이스 가입일", filterName: null },
];

const recentPromptColumn = [
  { name: "유저ID", filterName: null },
  { name: "프롬프트ID", filterName: null },
  { name: "이름", filterName: null },
  { name: "설명", filterName: null },
  { name: "카테고리", filterName: null },
  { name: "생성일", filterName: "createdAt" },
  { name: "조회수", filterName: "viewCount" },
  { name: "요청수", filterName: "executeCount" },
];

export default function SpaceStatistics() {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const {
    statsRecentMember,
    statsRecentPrompt,
    tokenUsage,
    spaceId,
    spaceDomain,
  } = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState<boolean>(false);
  const [statsRecentMemberData, setStatsRecentMemberData] =
    useState<SpaceStatisticsMemberListCursorType[]>();
  const [statsRecentPromptData, setStatsRecentPromptData] =
    useState<SpaceStatisticsPromptListCursorType[]>();
  const [tokenUsageData, setTokenUsageData] =
    useState<SpaceStatisticsTokenUsageType>();
  const [spaceDomainData, setSpaceDomainData] = useState<SpaceInfoType>();

  useEffect(() => {
    if (!statsRecentMember || !statsRecentPrompt || !tokenUsage) return;
    if (statsRecentMember) {
      setStatsRecentMemberData(statsRecentMember);
    }
    if (statsRecentPrompt) {
      setStatsRecentPromptData(statsRecentPrompt);
    }
    if (tokenUsage) {
      setTokenUsageData(tokenUsage);
    }
  }, [statsRecentMember, statsRecentPrompt, tokenUsage]);

  useMemo(() => {
    if (!spaceDomain) return;
    setSpaceDomainData(spaceDomain);
  }, [spaceDomain]);
  return (
    <>
      {loading && <Loading />}
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={statisticsSpaceStyle.title}>
          {spaceDomainData?.name} 스페이스 통계
        </p>
        <Buttons
          size={"small"}
          onClick={() => {
            revalidator.revalidate();
            if (revalidator.state === "loading") {
              setLoading(true);
            } else {
              setLoading(false);
            }
          }}
        >
          전체 업데이트
        </Buttons>
      </Flex>
      <Flex marginBottom={"16px"}>
        <p className={statisticsSpaceStyle.subTitle}>통계 내역</p>
        <Div marginLeft={"auto"} display={"inherit"} gap={"4px"}>
          <Buttons
            size={"small"}
            backgroundColor={vars.colors["Primary/Primary 50"]}
            color={vars.colors["Primary/Primary 500"]}
            onClick={() => {
              navigate(`/statistics/user/${spaceId}`);
            }}
          >
            유저 통계 보기
          </Buttons>
          <Buttons
            size={"small"}
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
      <Box
        padding={"24px"}
        borderRadius={"16px"}
        border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
        marginBottom={"16px"}
        className={loading ? statisticsSpaceStyle.loading : ""}
      >
        <p className={recentStatisticsStyle.statisticsTitle}>
          최근 가입 유저 (최근 10개)
        </p>
        <Table>
          <thead>
            <tr>
              {recentUserColumn.map((column, index) => {
                return <TH key={index}>{column.name}</TH>;
              })}
            </tr>
          </thead>
          <tbody>
            {statsRecentMemberData?.map((member, index) => {
              return (
                <tr key={index}>
                  <TD>{member.memberName}</TD>
                  <TD>{member.id}</TD>
                  <TD>{member.memberEmail}</TD>
                  <TD>{dayJsFormatter(member.createdAt)}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
      <Box
        padding={"24px"}
        borderRadius={"16px"}
        border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
        marginBottom={"16px"}
        className={loading ? statisticsSpaceStyle.loading : ""}
      >
        <p className={recentStatisticsStyle.statisticsTitle}>
          최근 생성된 프롬프트 (최근 10개)
        </p>
        <Table>
          <thead>
            <tr>
              {recentPromptColumn.map((column) => (
                <TH theme="flex" key={column.name}>
                  {column.name}
                  {column.filterName && (
                    <Sorting
                      cursor={"pointer"}
                      onClick={() => {
                        // TODO: sort
                      }}
                    />
                  )}
                </TH>
              ))}
            </tr>
          </thead>
          <tbody>
            {statsRecentPromptData?.map((prompt, index) => {
              return (
                <tr key={index}>
                  <TD>{prompt.authorId}</TD>
                  <TD>{prompt.promptId}</TD>
                  <TD>{prompt.name}</TD>
                  <TD>{prompt.description}</TD>
                  <TD theme={"yellowFilled"}>{prompt.categoryLabel}</TD>
                  <TD>{dayJsFormatter(prompt.createdAt)}</TD>
                  <TD>{prompt.viewCount}</TD>
                  <TD>{prompt.executeCount}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
      <Box className={loading ? statisticsSpaceStyle.loading : ""}>
        <Flex>
          <p className={recentStatisticsStyle.statisticsTitle}>
            월별 토큰 사용량
          </p>
        </Flex>
        <Flex gap={"8px"} display={"flex"} marginBottom={"32px"}>
          <div className={recentStatisticsStyle.statisticsTab}>
            <p className={recentStatisticsStyle.statisticsTitle}>총 할당량</p>
            <p className={recentStatisticsStyle.statisticValue}>
              {thousand(tokenUsageData?.credit)}
            </p>
          </div>
          <div className={recentStatisticsStyle.statisticsTab}>
            <p className={recentStatisticsStyle.statisticsTitle}>
              이번달 사용량
            </p>
            <p className={recentStatisticsStyle.statisticValue}>
              {thousand(tokenUsageData?.usedCreditThisMonth)}
            </p>
          </div>
          <div className={recentStatisticsStyle.statisticsTab}>
            <p className={recentStatisticsStyle.statisticsTitle}>누적 사용량</p>
            <p className={recentStatisticsStyle.statisticValue}>
              {thousand(tokenUsageData?.usedCredit)}
            </p>
          </div>
          <div className={recentStatisticsStyle.statisticsTab}>
            <p className={recentStatisticsStyle.statisticsTitle}>잔여 사용량</p>
            <p className={recentStatisticsStyle.statisticValue}>
              {thousand(tokenUsageData?.usableCredit)}
            </p>
          </div>
        </Flex>
      </Box>
    </>
  );
}
