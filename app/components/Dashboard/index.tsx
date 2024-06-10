import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Buttons from "~/components/Box/Buttons";
import { loader } from "~/routes/_index";
import { spaceRoleLabel } from "~/types/shared.types";
import { dayJsFormatter } from "~/utils/formatter";
import { thousand } from "~/utils/helpers";
import Box from "../Box";
import { TD, TH, Table } from "../Box/Table";
import { dashboardStyle } from "./styles.css";
import {
  PromptType,
  SpaceType,
  StatisticsMemberType,
  TotalCountProps,
} from "./types";

export default function Dashboard() {
  const response = useLoaderData<typeof loader>();
  const [totalData, setTotalData] = useState<TotalCountProps>();
  const [bestPromptData, setBestPromptData] = useState<PromptType[]>();
  const [recentJoinMemberData, setRecentJoinMemberData] =
    useState<StatisticsMemberType[]>();
  const [recentCreateSpaceData, setRecentCreateSpaceData] =
    useState<SpaceType[]>();
  const [recentCreatePromptData, setRecentCreatePromptData] =
    useState<PromptType[]>();
  useEffect(() => {
    if (!response) return;
    if (response) {
      setTotalData({
        totalMemberCount: response.totalMemberCount,
        totalSpaceCount: response.totalSpaceCount,
        totalPromptCount: response.totalPromptCount,
        todayTotalCreditUsed: response.todayTotalCreditUsed,
        thisMonthTotalCreditUsed: response.thisMonthTotalCreditUsed,
      });
      setBestPromptData(response.bestPromptList);
      setRecentJoinMemberData(response.recentJoinMemberList);
      setRecentCreateSpaceData(response.recentCreatedSpaceList);
      setRecentCreatePromptData(response.recentCreatedPromptList);
    }
  }, [response]);
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={dashboardStyle.title}>대시보드</p>
        <Buttons size={"small"}>전체 업데이트</Buttons>
      </Box>
      <Box gap={"8px"} display={"flex"} marginBottom={"32px"}>
        <div className={dashboardStyle.statisticsTab}>
          <p className={dashboardStyle.statisticsTitle}>전체 유저</p>
          <p className={dashboardStyle.statisticValue}>
            {thousand(totalData?.totalMemberCount)}명
          </p>
        </div>
        <div className={dashboardStyle.statisticsTab}>
          <p className={dashboardStyle.statisticsTitle}>스페이스 갯수</p>
          <p className={dashboardStyle.statisticValue}>
            {thousand(totalData?.totalSpaceCount)}명
          </p>
        </div>
        <div className={dashboardStyle.statisticsTab}>
          <p className={dashboardStyle.statisticsTitle}>스토어 프롬프트 갯수</p>
          <p className={dashboardStyle.statisticValue}>
            {thousand(totalData?.totalPromptCount)}명
          </p>
        </div>
        <div className={dashboardStyle.statisticsTab}>
          <p className={dashboardStyle.statisticsTitle}>
            오늘 하루 크레딧 사용량
          </p>
          <p className={dashboardStyle.statisticValue}>
            {thousand(totalData?.todayTotalCreditUsed)}
          </p>
        </div>
        <div className={dashboardStyle.statisticsTab}>
          <p className={dashboardStyle.statisticsTitle}>
            한달 총 크레딧 사용량
          </p>
          <p className={dashboardStyle.statisticValue}>
            {thousand(totalData?.thisMonthTotalCreditUsed)}
          </p>
        </div>
      </Box>
      <div>
        <p className={dashboardStyle.boxTitle}>인기 프롬프트</p>
        <Table>
          <thead>
            <tr>
              <TH>프롬프트 명</TH>
              <TH>설명</TH>
              <TH>카테고리</TH>
              <TH>조회수</TH>
              <TH>요청수</TH>
              <TH>생성일</TH>
            </tr>
          </thead>
          <tbody>
            {bestPromptData?.map((data, index) => {
              return (
                <tr key={index}>
                  <TD>
                    <Link className={dashboardStyle.tdLink} to="#">
                      {data.name}
                    </Link>
                  </TD>
                  <TD>{data.description}</TD>
                  <TD theme={"yellowFilled"}>{data.categoryLabel}</TD>
                  <TD>{data.viewCount}</TD>
                  <TD>{data.executeCount}</TD>
                  <TD>{dayJsFormatter(data.createdAt)}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <p className={dashboardStyle.boxTitle}>최근 가입 유저</p>
        <Table>
          <thead>
            <tr>
              <TH>이름</TH>
              <TH>이메일</TH>
              <TH>스페이스</TH>
              <TH>타입</TH>
              <TH>요청횟수</TH>
              <TH>가입일</TH>
            </tr>
          </thead>
          <tbody>
            {recentJoinMemberData?.map((data, index) => {
              return (
                <tr key={index}>
                  <TD>{data.name}</TD>
                  <TD>{data.email}</TD>
                  <TD>{data.spaceName}</TD>
                  <TD
                    theme={
                      data?.spaceRoleType === "ROLE_SPACE_OWNER"
                        ? "primaryFilled"
                        : "grayScaleFilled"
                    }
                  >
                    {data?.spaceRoleType
                      ? spaceRoleLabel[data.spaceRoleType]
                      : ""}
                  </TD>
                  <TD>{thousand(data.executeCount)}</TD>
                  <TD>{dayJsFormatter(data.createdAt)}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <p className={dashboardStyle.boxTitle}>최근 생성된 스페이스</p>
        <Table>
          <thead>
            <tr>
              <TH>스페이스 명</TH>
              <TH>도메인</TH>
              <TH>멤버수</TH>
              <TH>프롬프트수</TH>
              <TH>총 할당 토큰</TH>
              <TH>총 사용 토큰</TH>
              <TH>총 남은 토큰</TH>
              <TH>소유자</TH>
              <TH>생성일</TH>
            </tr>
          </thead>
          <tbody>
            {recentCreateSpaceData?.map((data, index) => {
              return (
                <tr key={index}>
                  <TD>{data.name}</TD>
                  <TD>{data.domain}</TD>
                  <TD>{data.memberCount}</TD>
                  <TD>{data.promptCount}</TD>
                  <TD>{thousand(data.credit)}</TD>
                  <TD>{thousand(data.usedCredit)}</TD>
                  <TD>{thousand(data.usableCredit)}</TD>
                  <TD>{data.ownerEmail}</TD>
                  <TD>{dayJsFormatter(data.createdAt)}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <p className={dashboardStyle.boxTitle}>최근 생성된 프롬프트</p>
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
            {recentCreatePromptData?.map((data, index) => {
              return (
                <tr key={index}>
                  <TD>{data.name}</TD>
                  <TD>{data.categoryLabel}</TD>
                  <TD>{data.viewCount}</TD>
                  <TD>{data.executeCount}</TD>
                  <TD>{dayJsFormatter(data.createdAt)}</TD>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
