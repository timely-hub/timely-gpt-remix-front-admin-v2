import { useLoaderData, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import localForage from "localforage";
import { useEffect, useState } from "react";
import {
  PromptInfoType,
  PromptPackageListType,
} from "~/Services/space-controller/space-controller.types";
import ArrowDown from "~/assets/icons/ArrowDown.svg?react";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import { loader } from "~/routes/space.create.prompt-package";
import { promptBoxStyle } from "~/styles/share.css";
import { vars } from "~/styles/vars.css";
import { llmModelCategoryTypeLabel } from "~/types/enum.types";
import { spaceCreateStyle } from "../styles.css";
import { promptPackageStyle } from "./styles.css";

export default function PromptPackage() {
  const { packageList } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [promptPackageList, setPromptPackageList] =
    useState<PromptPackageListType[]>();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [toggleItems, setToggleItems] = useState<Record<number, boolean>>({});
  const toggleCheckbox = (item: PromptInfoType) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
  };

  const toggleDropDown = (id: number) => {
    setToggleItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    if (!packageList) return;
    const convertedPackageList: PromptPackageListType[] = packageList.map(
      (item) => ({
        promptList: item.promptList || [],
        id: item.id,
        label: item.label,
        promptIdList: item.promptIdList || [],
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    );
    setPromptPackageList(convertedPackageList);
  }, [packageList]);

  const [checkedPrompts, setCheckedPrompts] = useState<PromptInfoType[]>([]);

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    prompt: PromptInfoType
  ) => {
    if (event.target.checked) {
      setCheckedPrompts((prev) => [...prev, prompt]);
    } else {
      setCheckedPrompts((prev) => prev.filter((p) => p.id !== prompt.id));
    }
  };

  return (
    <Box margin={"0 auto"} padding={"32px"} width={"100%"}>
      <div className={spaceCreateStyle.title}>프롬프트 꾸러미 선택</div>
      <Flex flexDirection={"column"} gap={"8px"} marginBottom={"16px"}>
        {promptPackageList?.map((item) => (
          <Box
            key={item.id}
            border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
            padding={"16px"}
          >
            <Box display={"flex"} gap={"8px"}>
              <label
                className={promptPackageStyle.label}
                id={`promptPackage-${item.id}`}
              >
                <input
                  type="checkbox"
                  name={`promptPackage-${item.id}`}
                  checked={checkedItems[item.id] || false}
                  onChange={() => toggleCheckbox(item)}
                />
                <p>{item.label}</p>
                <p>({item.promptIdList.length}개)</p>
              </label>
              <Div
                cursor={"pointer"}
                marginLeft={"auto"}
                onClick={() => toggleDropDown(item.id)}
              >
                <ArrowDown></ArrowDown>
              </Div>
            </Box>
            <Flex gap={"8px"}>
              {toggleItems[item.id] &&
                item.promptList?.map((prompt, index) => {
                  return (
                    <Box className={clsx(promptBoxStyle.box)} key={index}>
                      <label id={`prompt-${prompt.id}`}>
                        <Flex gap={"8px"}>
                          <input
                            name={`prompt-${prompt.id}`}
                            type="checkbox"
                            onChange={(event) => handleCheck(event, prompt)}
                          />
                          <div className={promptBoxStyle.llmModel}>
                            {prompt?.llmModelCategoryType
                              ? llmModelCategoryTypeLabel[
                                  prompt.llmModelCategoryType as keyof typeof llmModelCategoryTypeLabel
                                ]
                              : ""}
                          </div>
                          <div className={promptBoxStyle.category}>
                            {prompt.categoryId}
                          </div>
                        </Flex>
                        <div className={promptBoxStyle.title}>
                          {prompt.name}
                        </div>
                        <div className={promptBoxStyle.description}>
                          {prompt.description}
                        </div>
                      </label>
                    </Box>
                  );
                })}
            </Flex>
          </Box>
        ))}
      </Flex>
      <Div textAlign={"center"}>
        <Buttons
          onClick={() => {
            localForage.setItem("promptData", checkedPrompts);
            navigate("/space/create/prompt-recommend");
          }}
        >
          다음 단계
        </Buttons>
      </Div>
    </Box>
  );
}
