import { useLoaderData, useRevalidator } from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { PromptInfoType } from "~/Services/space-controller/space-controller.types";
import Download from "~/assets/icons/Download.svg?react";
import OutlineEye from "~/assets/icons/OutlineEye.svg?react";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import Checkbox from "~/components/Box/Checkbox";
import TextInput from "~/components/Box/TextInput";
import { spaceCreateStyle } from "~/components/SpaceCreate/styles.css";
import { loader } from "~/routes/store.package.edit.$id";
import { promptBoxStyle } from "~/styles/share.css";
import { vars } from "~/styles/vars.css";
import { llmModelCategoryTypeLabel } from "~/types/shared.types";
import ModalPromptComponent from "./Modal";

export default function PromptPackageEditComponent() {
  const revalidator = useRevalidator();
  const { id, label, response } = useLoaderData<typeof loader>();
  const [promptDataList, setpromptDataList] = useState<PromptInfoType[]>();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [existIds, setExistIds] = useState<number[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (!response) return;
    setpromptDataList(response);
  }, [response]);

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

  const closeModal = () => {
    setModal(false);
    revalidator.revalidate();
  };

  return (
    <>
      {modal && (
        <ModalPromptComponent
          onClose={closeModal}
          id={id || "0"}
          label={label || ""}
          existPromptIdList={existIds}
        />
      )}
      <Box margin={"0 auto"} padding={"24px 0"}>
        <Div className={spaceCreateStyle.title}>{label} 꾸러미 편집</Div>
        <Flex marginBottom={"16px"} justifyContent={"flex-end"} gap={"8px"}>
          <Buttons theme={"dangerGhostFilled"} size={"small"}>
            꾸러미 삭제하기
          </Buttons>
          <Buttons theme={"primaryGhostFilled"} size={"small"}>
            변경하기
          </Buttons>
        </Flex>
        <Flex
          border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
          borderRadius={"16px"}
          padding={"24px 16px"}
          flexDirection={"column"}
          marginBottom={"16px"}
        >
          <div className={promptBoxStyle.description}>꾸러미 이름</div>
          <TextInput value={label || ""} disabled={true} />
        </Flex>
        <Box
          padding={"24px 16px"}
          border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
          borderRadius={"16px"}
        >
          <Flex marginBottom={"10px"} justifyContent={"flex-end"} gap={"8px"}>
            <Buttons theme={"grayscaleFilled"} size={"small"}>
              삭제
            </Buttons>
            <Buttons
              theme={"primaryFilled"}
              size={"small"}
              onClick={() => {
                const existIdsList = promptDataList?.map((item) => item.id);
                setModal(true);
                setExistIds(existIdsList || []);
              }}
            >
              추가
            </Buttons>
          </Flex>
          <Flex gap={"8px"} flexWrap={"wrap"} marginBottom={"32px"}>
            {promptDataList?.map((item) => (
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
                    <div className={promptBoxStyle.category}>
                      {item.categoryLabel}
                    </div>
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
                      src={item.member.profileImageUrl}
                      alt={item.name}
                    />
                    <div className={promptBoxStyle.name}>
                      {item.member.name}
                    </div>
                    <Box marginLeft={"auto"} display={"inherit"} gap={"8px"}>
                      <Flex gap={"4px"}>
                        <OutlineEye />
                        <span className={promptBoxStyle.smallDescription}>
                          {item.viewCount}
                        </span>
                      </Flex>
                      <Flex gap={"4px"}>
                        <Download />
                        <span className={promptBoxStyle.smallDescription}>
                          {item.bookmarkCount}
                        </span>
                      </Flex>
                    </Box>
                  </Flex>
                </label>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
