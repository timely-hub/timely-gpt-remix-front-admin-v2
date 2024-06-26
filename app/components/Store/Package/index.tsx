import { useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import { PromptPackageListType } from "~/Services/space-controller/space-controller.types";
import Box, { Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import ModalContainer from "~/components/Box/Modal/Container";
import { TD, TH, Table } from "~/components/Box/Table";
import TextInput from "~/components/Box/TextInput";
import { statisticsSpaceStyle } from "~/components/Statistics/styles.css";
import { loader } from "~/routes/store.package._index";
import { callToast } from "~/zustand/toastSlice";

export default function PackageComponent() {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { promptPackageList } = useLoaderData<typeof loader>();
  const [storeData, setStoreData] = useState<PromptPackageListType[]>();
  // const [updateCategory, setUpdateCategory] = useState<number | string>({
  //   id: 0,
  //   name: "",
  // });
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!promptPackageList) return;
    setStoreData(promptPackageList);
  }, [promptPackageList]);
  return (
    <>
      {modal && (
        <ModalContainer onClose={() => setModal(false)} title="꾸러미 생성">
          <TextInput placeholder="꾸러미 이름을 입력해주세요." />
          <Flex gap={"8px"} justifyContent={"center"}>
            <Buttons
              theme="grayscaleFilled"
              size={"small"}
              onClick={() => setModal(false)}
            >
              취소
            </Buttons>
            <Buttons theme="primaryFilled" size={"small"}>
              생성
            </Buttons>
          </Flex>
        </ModalContainer>
      )}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"16px"}
      >
        <p className={statisticsSpaceStyle.title}>스토어 프롬프트 목록</p>
        <Buttons
          size={"small"}
          onClick={async () => {
            revalidator.revalidate();
            callToast("업데이트 되었습니다.", "success");
          }}
        >
          전체 업데이트
        </Buttons>
      </Box>
      <Box marginBottom={"16px"} textAlign={"right"}>
        <Buttons
          theme={"primaryGhostFilled"}
          size={"small"}
          onClick={() => setModal(true)}
        >
          추가
        </Buttons>
      </Box>
      <Table>
        <thead>
          <tr>
            <TH>이름</TH>
            <TH>설명</TH>
            <TH>관리</TH>
          </tr>
        </thead>
        <tbody>
          {storeData?.map((item, index) => {
            return (
              <tr key={index}>
                <TD>{item.label}</TD>
                <TD>{item.promptIdList.length} 개</TD>
                <TD>
                  <Buttons
                    borderRadius={"4px"}
                    size={"tdSmall"}
                    theme={"primaryFilled"}
                    onClick={() => {
                      navigate(
                        `/store/package/edit/${
                          item.id
                        }?label=${encodeURIComponent(item.label)}`
                      );
                    }}
                  >
                    편집
                  </Buttons>
                </TD>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
