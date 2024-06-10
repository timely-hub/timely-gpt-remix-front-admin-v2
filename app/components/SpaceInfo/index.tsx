import { useLoaderData, useNavigate } from "@remix-run/react";
import { useMemo, useState } from "react";
import { loader } from "~/routes/space.list.info.$id";
import { SpaceMainType } from "~/types/shared.types";
import { thousand } from "~/utils/helpers";
import { callToast } from "~/zustand/toastSlice";
import Box, { Div, Flex } from "../Box";
import Buttons from "../Box/Buttons";
import { statisticsSpaceStyle } from "../Statistics/styles.css";
import { spaceInfoStyles } from "./styles.css";

export default function SpaceInfoComponent() {
  const navigate = useNavigate();
  const { spaceInfo, memberCount, promptCount } =
    useLoaderData<typeof loader>();

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
          {spaceInfoData?.name} 스페이스 상세
        </p>
        <Div marginLeft={"auto"} display={"inherit"} gap={"8px"}>
          <Buttons
            theme={"grayscaleFilled"}
            onClick={() => {
              callToast("준비중...", "error");
              return;
            }}
          >
            사용 정지
          </Buttons>
          <Buttons
            theme={"dangerGhostFilled"}
            onClick={() => {
              callToast("준비중...", "error");
              return;
            }}
          >
            스페이스 삭제
          </Buttons>
        </Div>
      </Box>
      <Flex gap={"8px"} marginBottom={"32px"}>
        <Box className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.column}>
            <div className={spaceInfoStyles.textDefault}>멤버수</div>
            <div className={spaceInfoStyles.textBoldRight}>{memberCount}명</div>
          </div>
        </Box>
        <Box className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.column}>
            <div className={spaceInfoStyles.textDefault}>
              {"이용중인 프롬프트 갯수\n(가져오기+생성)"}
            </div>
            <div className={spaceInfoStyles.textBoldRight}>{promptCount}개</div>
          </div>
        </Box>
      </Flex>
      <Flex marginBottom={"8px"}>
        <div className={spaceInfoStyles.textBold}>스페이스 정보</div>
        <Box marginLeft={"auto"} display={"inherit"} gap={"8px"}>
          <Buttons
            theme={"grayscaleFilled"}
            onClick={() => {
              navigate(`/statistics/user/${spaceInfo?.id}`);
            }}
          >
            {spaceInfoData?.name} 유저 목록
          </Buttons>
          <Buttons
            theme={"grayscaleFilled"}
            onClick={() => {
              callToast("준비중...", "error");
              return;
            }}
          >
            스페이스 테마 관리
          </Buttons>
        </Box>
      </Flex>
      <Box className={spaceInfoStyles.box} marginBottom={"32px"}>
        <div className={spaceInfoStyles.column}>
          <div>
            <p className={spaceInfoStyles.textTitleDefault}>
              스페이스 명 : {spaceInfoData?.name}
            </p>
            <p className={spaceInfoStyles.textTitleDefault}>
              도메인 : {spaceInfoData?.domain}
            </p>
            <p className={spaceInfoStyles.textTitleDefault}>
              등급 : {spaceInfoData?.grade}
            </p>
          </div>
        </div>
      </Box>
      <Flex marginBottom={"8px"} justifyContent={"space-between"}>
        <div className={spaceInfoStyles.textBold}>토큰 관리</div>
        <Buttons
          theme={"primaryGhostFilled"}
          onClick={() => {
            callToast("준비중...", "error");
            return;
          }}
        >
          토큰 할당량 설정
        </Buttons>
      </Flex>
      <Flex gap={"8px"} marginBottom={"32px"}>
        <div className={spaceInfoStyles.box}>
          <div className={spaceInfoStyles.textDefault}>총 할당량</div>
          <div className={spaceInfoStyles.textBoldRight}>
            {thousand(spaceInfoData?.credit)}
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
