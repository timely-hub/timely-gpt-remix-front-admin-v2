import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { loader } from "~/routes/space.list.info.$id";
import { SpaceMainType } from "~/types/shared.types";
import Box, { Div, Flex } from "../Box";
import { statisticsSpaceStyle } from "../Statistics/styles.css";
import Buttons from "../Box/Buttons";
import { spaceInfoStyles } from "./styles.css";
import { Button } from "stories/Button";

export default function SpaceInfoComponent() {
  const { spaceInfo } = useLoaderData<typeof loader>();

  const [spaceInfoData, setSpaceInfoData] = useState<SpaceMainType>();

  useMemo(() => {
    if (spaceInfo) {
      setSpaceInfoData(spaceInfo);
    }
  }, [spaceInfo]);

  return (
    <>
      <Box display={"flex"} alignItems={"center"} marginBottom={"16px"}>
        <p className={statisticsSpaceStyle.title}>
          {spaceInfoData?.name} 생성된 프롬프트 통계
        </p>
        <Div marginLeft={"auto"} display={"inherit"} gap={"8px"}>
          <Buttons theme={"grayscaleFilled"} onClick={() => {}}>
            사용 정지
          </Buttons>
          <Buttons theme={"dangerGhostFilled"} onClick={() => {}}>
            스페이스 삭제
          </Buttons>
        </Div>
      </Box>
      <Flex gap={"8px"} marginBottom={"32px"}>
        <Box className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.column}>
            <div className={spaceInfoStyles.textDefault}>멤버수</div>
            <div className={spaceInfoStyles.textBoldRight}>500명</div>
          </div>
        </Box>
        <Box className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.column}>
            <div className={spaceInfoStyles.textDefault}>
              {"이용중인 프롬프트 갯수\n(가져오기+생성)"}
            </div>
            <div className={spaceInfoStyles.textBoldRight}>500명</div>
          </div>
        </Box>
      </Flex>
      <Flex marginBottom={"8px"}>
        <div className={spaceInfoStyles.textBold}>스페이스 정보</div>
        <Box marginLeft={"auto"} display={"inherit"} gap={"8px"}>
          <Buttons theme={"grayscaleFilled"} onClick={() => {}}>
            {spaceInfoData?.name} 유저 목록
          </Buttons>
          <Buttons theme={"grayscaleFilled"} onClick={() => {}}>
            스페이스 멤버 관리
          </Buttons>
          <Buttons theme={"grayscaleFilled"} onClick={() => {}}>
            스페이스 테마 관리
          </Buttons>
        </Box>
      </Flex>
      <Box className={spaceInfoStyles.box} marginBottom={"32px"}>
        <div className={spaceInfoStyles.column}>
          <div>
            <p className={spaceInfoStyles.textTitleDefault}>
              스페이스 명:{spaceInfoData?.name}
            </p>
            <p className={spaceInfoStyles.textTitleDefault}>
              도메인:{spaceInfoData?.domain}
            </p>
            <p className={spaceInfoStyles.textTitleDefault}>
              등급:{spaceInfoData?.grade}
            </p>
          </div>
        </div>
      </Box>
      <Flex marginBottom={"8px"} justifyContent={"space-between"}>
        <div className={spaceInfoStyles.textBold}>토큰 관리</div>
        <Buttons theme={"primaryGhostFilled"}>토큰 할당량 설정</Buttons>
      </Flex>
      <Flex gap={"8px"} marginBottom={"32px"}>
        <div className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.textDefault}>총 할당량</div>
          <div className={spaceInfoStyles.textBoldRight}>
            {spaceInfoData?.credit}
          </div>
        </div>
        <div className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.textDefault}>누적 사용량</div>
          <div className={spaceInfoStyles.textBoldRight}>
            {spaceInfoData?.tokenUsage}
          </div>
        </div>
        <div className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.textDefault}>잔여 사용량</div>
          <div className={spaceInfoStyles.textBoldRight}>
            {spaceInfoData?.usedCredit}
          </div>
        </div>
      </Flex>
      <Box className={spaceInfoStyles.textBold} marginBottom={"8px"}>
        결제 정보
      </Box>
      <div className={spaceInfoStyles.box}>
        <div className={spaceInfoStyles.textTitleDefault}>입금자명:</div>
        <div className={spaceInfoStyles.textTitleDefault}>결제 금액:</div>
        <div className={spaceInfoStyles.textTitleDefault}>결제 방식:</div>
        <div className={spaceInfoStyles.textTitleDefault}>업체 정보:</div>
      </div>
    </>
  );
}
