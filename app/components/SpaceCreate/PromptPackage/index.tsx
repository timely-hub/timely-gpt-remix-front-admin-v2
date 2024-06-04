import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
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
import { loader as promptIdsData } from "~/routes/api.get-prompt-info.$id";
import { loader } from "~/routes/space.create.prompt-package";
import { promptBoxStyle } from "~/styles/share.css";
import { vars } from "~/styles/vars.css";
import { llmModelCategoryTypeLabel } from "~/types/enum.types";
import { spaceCreateStyle } from "../styles.css";
import { promptPackageStyle } from "./styles.css";

export default function PromptPackage() {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof promptIdsData>();
  const { packageList } = useLoaderData<typeof loader>();
  const [promptPackageList, setPromptPackageList] =
    useState<PromptPackageListType[]>();
  const [accumulatedData, setAccumulatedData] = useState<PromptInfoType[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [promptInfo, setPromptInfo] = useState<
    PromptInfoType[] | undefined | null
  >();
  const [toggleItems, setToggleItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (fetcher.state === "idle") {
      setPromptInfo(fetcher.data?.response);
      setAccumulatedData((currentData) => {
        const newData = (fetcher.data?.response || []).filter(
          (newItem) =>
            !currentData.some((currentItem) => currentItem.id === newItem.id)
        );
        return [...currentData, ...newData];
      });
    }
  }, [fetcher]);

  useEffect(() => {
    if (!packageList) return;
    setPromptPackageList(packageList);
  }, [packageList]);

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
            <Box display={"flex"} gap={"8px"} width={"100%"}>
              <label
                className={promptPackageStyle.label}
                id={`promptPackage-${item.id}`}
              >
                <input
                  type="checkbox"
                  name={`promptPackage-${item.id}`}
                  checked={toggleItems[item.id] || false}
                  onChange={() => {
                    const isChecked = !toggleItems[item.id];
                    setToggleItems({
                      ...toggleItems,
                      [item.id]: isChecked,
                    });

                    if (isChecked) {
                      const formData = new FormData();
                      formData.append("id", item.id.toString());
                      fetcher.submit(formData, {
                        action: `/api/get-prompt-info/${item.id}`,
                      });
                    }
                  }}
                />
                <p>{item.label}</p>
                <p>({item.promptIdList.length}개)</p>
                <Div cursor={"pointer"} marginLeft={"auto"}>
                  <ArrowDown></ArrowDown>
                </Div>
              </label>
            </Box>
            <Flex gap={"8px"}>
              {toggleItems[item.id] &&
                accumulatedData
                  ?.filter((prompt) => item.promptIdList.includes(prompt.id))
                  .map((prompt, index) => {
                    return (
                      <Box className={clsx(promptBoxStyle.box)} key={index}>
                        <Flex gap={"8px"}>
                          <div className={promptBoxStyle.llmModel}>
                            {prompt?.llmModelCategoryType
                              ? llmModelCategoryTypeLabel[
                                  prompt.llmModelCategoryType as keyof typeof llmModelCategoryTypeLabel
                                ]
                              : ""}
                          </div>
                        </Flex>
                        <div className={promptBoxStyle.title}>
                          {prompt.name}
                        </div>
                        <div className={promptBoxStyle.description}>
                          {prompt.description}
                        </div>
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
            localForage.setItem("promptData", accumulatedData);
            navigate("/space/create/prompt-recommend");
          }}
        >
          다음 단계
        </Buttons>
      </Div>
    </Box>
  );
}
