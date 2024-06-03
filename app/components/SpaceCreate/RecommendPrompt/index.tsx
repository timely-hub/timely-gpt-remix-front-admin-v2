import clsx from "clsx";
import localForage from "localforage";
import { useEffect, useState } from "react";
import { PromptInfoType } from "~/Services/space-controller/space-controller.types";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import Checkbox from "~/components/Box/Checkbox";
import useBulkState from "~/hooks/useBulkState";
import { promptBoxStyle } from "~/styles/share.css";
import { ApiResponseType } from "~/types/api";
import { llmModelCategoryTypeLabel } from "~/types/enum.types";
import { SpaceMainType, defaultSpaceMainType } from "~/types/shared.types";
import { callToast } from "~/zustand/toastSlice";
import { spaceCreateStyle } from "../styles.css";

const getPromptDataList = async () => {
  const response = await localForage.getItem("promptData");
  return response as PromptInfoType[];
};

const getSpaceMain = async () => {
  const response = await localForage.getItem("spaceMain");
  return response as SpaceMainType;
};

const createSpace = async (spaceData: SpaceMainType) => {
  const response = await fetch(`/api/space-create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spaceData),
  });
  return (await response.json()) as ApiResponseType<string>;
};

export default function RecommendPrompt() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [promptDataList, setPromptDataList] = useState<PromptInfoType[]>();
  const { state, setState, init } =
    useBulkState<SpaceMainType>(defaultSpaceMainType);
  useEffect(() => {
    getPromptDataList().then((data) => {
      setPromptDataList(data);
    });
  }, []);

  useEffect(() => {
    getSpaceMain().then((data) => {
      init(data);
    });
  }, [init]);

  const toggleCheckbox = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleItemClick = (id: number) => {
    setActiveIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((activeId) => activeId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Box margin={"0 auto"} padding={"24px 32px"}>
      <Div className={spaceCreateStyle.title} textAlign={"center"}>
        추천 프롬프트 선택
      </Div>
      <Flex gap={"8px"} flexWrap={"wrap"} marginBottom={"32px"}>
        {promptDataList?.map((item: PromptInfoType) => (
          <Box
            className={clsx(
              promptBoxStyle.box,
              checkedItems[item.id] ? promptBoxStyle.checked : ""
            )}
            key={item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <label id={`prompt-${item.id}`}>
              <Flex gap={"8px"}>
                <Checkbox
                  name={`prompt-${item.id}`}
                  active={checkedItems[item.id]}
                  onClick={() => toggleCheckbox(item.id)}
                />
                <div className={promptBoxStyle.llmModel}>
                  {item?.llmModelCategoryType
                    ? llmModelCategoryTypeLabel[
                        item.llmModelCategoryType as keyof typeof llmModelCategoryTypeLabel
                      ]
                    : ""}
                </div>
                <div className={promptBoxStyle.category}>{item.categoryId}</div>
              </Flex>
              <div className={promptBoxStyle.title}>{item.name}</div>
              <div className={promptBoxStyle.description}>
                {item.description}
              </div>
              <Flex gap={"8px"} alignItems={"center"}>
                <img
                  className={promptBoxStyle.img}
                  width={"24px"}
                  height={"24px"}
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div className={promptBoxStyle.name}>{item.name}</div>
              </Flex>
            </label>
          </Box>
        ))}
      </Flex>
      <Div textAlign={"center"}>
        <Buttons
          onClick={async () => {
            setState("recommendPromptIdList", activeIds);
            const response = await createSpace(state);
            if (!response?.success) {
              callToast(response?.message || "스페이스 생성에 실패했습니다.");
              return;
            }
            callToast("스페이스가 생성되었습니다.", "success");
            // navigate("/space/create/complete");
          }}
        >
          스페이스 생성
        </Buttons>
      </Div>
    </Box>
  );
}
