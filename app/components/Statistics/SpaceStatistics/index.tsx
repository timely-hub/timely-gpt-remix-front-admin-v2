import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Box, { Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import { TD, TH, Table } from "~/components/Box/Table";
import { loader } from "~/routes/statistics.space.$id";
import {
  SpaceStatisticsMemberListCursorType,
  SpaceStatisticsPromptListType,
  SpaceStatisticsTokenUsageType,
} from "~/services/space-statistics-controller/space-statistics-controller.types";
import { vars } from "~/styles/vars.css";
import { thousand } from "~/utils/helpers";
import { statisticsSpaceStyle } from "../styles.css";
import { recentStatisticsStyle } from "./styles.css";

export default function SpaceStatistics() {
  const { statsRecentMember, statsRecentPrompt, tokenUsage } =
    useLoaderData<typeof loader>();

  const [statsRecentMemberData, setStatsRecentMemberData] =
    useState<SpaceStatisticsMemberListCursorType[]>();
  const [statsRecentPromptData, setStatsRecentPromptData] =
    useState<SpaceStatisticsPromptListType[]>();
  const [tokenUsageData, setTokenUsageData] =
    useState<SpaceStatisticsTokenUsageType>();

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
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={statisticsSpaceStyle.title}>스페이스 선택</p>
        <Buttons>전체 업데이트</Buttons>
      </Flex>
      <Box
        padding={"24px"}
        borderRadius={"16px"}
        border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
        marginBottom={"16px"}
      >
        <p className={recentStatisticsStyle.statisticsTitle}>
          최근 가입 유저 (최근 10개)
        </p>
        <Table>
          <thead>
            <tr>
              <TH>이름</TH>
              <TH>유저ID</TH>
              <TH>이메일</TH>
              <TH>스페이스 가입일</TH>
            </tr>
          </thead>
          <tbody>
            {statsRecentMemberData?.map((member, index) => {
              return (
                <tr key={index}>
                  <TD>{member.memberName}</TD>
                  <TD>{member.id}</TD>
                  <TD>{member.memberEmail}</TD>
                  <TD>{member.createdAt}</TD>
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
      >
        <p className={recentStatisticsStyle.statisticsTitle}>
          최근 생성된 프롬프트 (최근 10개)
        </p>
        <Table>
          <thead>
            <tr>
              <TH>프롬프트 명</TH>
              <TH>카테고리</TH>
              <TH>조회수</TH>
              <TH>요청수</TH>
              <TH>생성일</TH>
            </tr>
          </thead>
          <tbody>
            {statsRecentPromptData?.map((prompt, index) => {
              return (
                <tr key={index}>
                  <TD>{prompt.name}</TD>
                  <TD>{prompt.categoryLabel}</TD>
                  <TD>{prompt.viewCount}</TD>
                  <TD>{prompt.executeCount}</TD>
                  <TD>{prompt.createdAt}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
      <Box>
        <Flex>
          <p className={recentStatisticsStyle.statisticsTitle}>
            최근 생성된 프롬프트 (최근 10개)
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
