import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { UserDetailType } from "~/Services/user-controller/user-controller.types";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import { spaceInfoStyles } from "~/components/SpaceInfo/styles.css";
import { statisticsSpaceStyle } from "~/components/Statistics/styles.css";
import { loader } from "~/routes/user.list.info.$id";
import { userRoleLabel } from "~/types/shared.types";
import { dayJsFormatter } from "~/utils/formatter";
import { thousand } from "~/utils/helpers";

export default function UserInfoComponent() {
  const { userInfoData } = useLoaderData<typeof loader>();
  const [userDetail, setUserDetail] = useState<UserDetailType>();

  useEffect(() => {
    if (userInfoData) {
      setUserDetail(userInfoData);
    }
  }, [userInfoData]);
  return (
    <>
      <Box display={"flex"} alignItems={"center"} marginBottom={"24px"}>
        <p className={statisticsSpaceStyle.title}>
          {userDetail?.name} 님의 상세 정보
        </p>
      </Box>
      <Div className={spaceInfoStyles.textBold} marginBottom={"8px"}>
        스페이스 정보
      </Div>
      <Flex gap={"8px"} marginBottom={"32px"}>
        <Box className={spaceInfoStyles.box}>
          <Flex
            flexDirection={"column"}
            gap={"8px"}
            className={spaceInfoStyles.textTitleDefault}
          >
            <p>이메일: {userDetail?.email}</p>
            <p>가입된 스페이스: {userDetail?.spaceName}</p>
            <p>
              유저 타입:{" "}
              {userDetail?.roleType ? userRoleLabel[userDetail.roleType] : ""}
            </p>
            <Flex alignItems={"center"} gap={"8px"}>
              프로필 이미지:{" "}
              <img
                className={spaceInfoStyles.img}
                src={userDetail?.profileImageUrl}
                alt={userDetail?.name}
                width={"32px"}
                height={"32px"}
              ></img>
            </Flex>
            <p>이름: {userDetail?.name}</p>
            <p>주소: {userDetail?.address}</p>
            <p>상세주소: {userDetail?.detailAddress}</p>
          </Flex>
        </Box>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={"8px"}
      >
        <Div className={spaceInfoStyles.textBold}>유저 활동</Div>
        <Buttons theme={"grayscaleFilled"}>가져온 프롬프트 목록 보기</Buttons>
      </Flex>
      <Flex gap={"8px"} marginBottom={"32px"}>
        <Box className={spaceInfoStyles.box}>
          <Flex
            flexDirection={"column"}
            gap={"8px"}
            className={spaceInfoStyles.textTitleDefault}
          >
            <p>프롬프트 생성: {thousand(userDetail?.promptCreatedCount)}</p>
            <p>가져온 프롬프트: {thousand(userDetail?.promptImportedCount)}</p>
            <p>
              프롬프트 요청 횟수: {thousand(userDetail?.promptExecutedCount)}
            </p>
            <p>최근 접속일: {dayJsFormatter(userDetail?.LastAccessedAt)}</p>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
