import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { CategoryType } from "~/Services/store-controller/store-controller.types";
import { Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import ModalContainer from "~/components/Box/Modal/Container";
import { TD, TH, Table } from "~/components/Box/Table";
import TextInput from "~/components/Box/TextInput";
import { loader } from "~/routes/store.category";
import { ApiResponseType } from "~/types/api";
import { callToast } from "~/zustand/toastSlice";

export type CategoryUpdateType = {
  label: string;
  description: string;
  method: string;
};

const updateCategory = async (
  id: string | number,
  data: CategoryUpdateType,
  method: string
) => {
  const response = await fetch(`/api/update-category/${id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, method }),
  });
  const responseJson = (await response.json()) as ApiResponseType<unknown>;
  return responseJson;
};

export default function CategoryManagementComponent() {
  const { categoryList } = useLoaderData<typeof loader>();
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categoryData, setCategoryData] = useState<CategoryType[]>();
  const [updateCategoryData, setUpdateCategoryData] =
    useState<CategoryUpdateType>({
      label: "",
      description: "",
      method: "PUT",
    });
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!categoryList) return;
    setCategoryData(categoryList);
  }, [categoryList]);
  return (
    <>
      {modal && (
        <ModalContainer
          onClose={() => setModal(false)}
          title="도구 카테고리 편집"
        >
          <TextInput
            value={updateCategoryData.label}
            onChange={(e) =>
              setUpdateCategoryData({
                ...updateCategoryData,
                label: e.target.value,
              })
            }
            placeholder="카테고리 이름을 입력해주세요."
          />
          <TextInput
            value={updateCategoryData.description}
            onChange={(e) =>
              setUpdateCategoryData({
                ...updateCategoryData,
                description: e.target.value,
              })
            }
            placeholder="카테고리 설명을 입력해주세요."
          />
          <Flex gap={"8px"} justifyContent={"center"}>
            <Buttons
              theme="grayscaleFilled"
              size={"small"}
              onClick={async () => {
                const response = await updateCategory(
                  categoryId,
                  updateCategoryData,
                  "DELETE"
                );
                if (response.success) {
                  callToast("카테고리가 성공적으로 삭제되었습니다.", "success");
                  setModal(false);
                }
              }}
            >
              삭제
            </Buttons>
            <Buttons
              size={"small"}
              theme="primaryFilled"
              onClick={async () => {
                const response = await updateCategory(
                  categoryId,
                  updateCategoryData,
                  "PUT"
                );
                if (response.success) {
                  callToast("카테고리가 성공적으로 변경되었습니다.", "success");
                  setModal(false);
                }
              }}
            >
              변경
            </Buttons>
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
          {categoryData?.map((item, index) => {
            return (
              <tr key={index}>
                <TD>{item.label}</TD>
                <TD>{item.description}</TD>
                <TD>
                  <Buttons
                    theme={"primaryFilled"}
                    size={"tdSmall"}
                    onClick={() => {
                      setCategoryId(item.id);
                      setUpdateCategoryData({
                        label: item.label,
                        description: item.description,
                        method: "PUT",
                      });
                      setModal(true);
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
