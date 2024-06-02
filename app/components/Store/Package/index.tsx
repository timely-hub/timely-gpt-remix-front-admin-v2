import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { PromptPackageListType } from "~/Services/space-controller/space-controller.types";
import { Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import ModalContainer from "~/components/Box/Modal/Container";
import { TD, TH, Table } from "~/components/Box/Table";
import TextInput from "~/components/Box/TextInput";
import { loader } from "~/routes/store.prompt-package";

export default function PackageComponent() {
  const { storeCategoryList } = useLoaderData<typeof loader>();
  const [storeData, setStoreData] = useState<PromptPackageListType[]>();
  const [updateCategory, setUpdateCategory] = useState<number | string>({
    id: 0,
    name: "",
  });
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!storeCategoryList) return;
    setStoreData(storeCategoryList);
  }, [storeCategoryList]);
  return (
    <>
      {modal && (
        <ModalContainer
          onClose={() => setModal(false)}
          title="도구 카테고리 편집"
        >
          <TextInput placeholder="카테고리 이름을 입력해주세요." />
          <Flex gap={"8px"}>
            <Buttons theme="grayscaleFilled">삭제하기</Buttons>
            <Buttons theme="primaryFilled">변경하기</Buttons>
          </Flex>
        </ModalContainer>
      )}
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
                    theme={"primaryFilled"}
                    onClick={() => setModal(true)}
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
