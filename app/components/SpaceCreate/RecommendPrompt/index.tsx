import localForage from "localforage";
import { useEffect, useState } from "react";
import { PromptInfoType } from "~/Services/space-controller/space-controller.types";
import Box, { Flex } from "~/components/Box";
import { promptBoxStyle } from "~/styles/share.css";
import { spaceCreateStyle } from "../styles.css";

const getPromptDataList = async () => {
  const response = await localForage.getItem("promptData");
  return response as PromptInfoType[];
};

export default function RecommendPrompt() {
  const [promptDataList, setPromptDataList] = useState<PromptInfoType[]>();
  useEffect(() => {
    getPromptDataList().then((data) => {
      setPromptDataList(data);
    });
  }, []);
  return (
    <Box margin={"0 auto"} padding={"32px 0"} width={"332px"}>
      <div className={spaceCreateStyle.title}>추천 프롬프트 선택</div>
      <Flex padding={"24px 32px"} gap={"8px"}>
        {promptDataList?.map((item) => (
          <Box className={promptBoxStyle.box} key={item.id}>
            <Flex>
              <input type="checkbox" />
              <div className={promptBoxStyle.llmModel}>
                {item.llmModelCategoryType}
              </div>
              <div className={promptBoxStyle.category}>{item.categoryId}</div>
            </Flex>
            <div className={promptBoxStyle.title}>{item.name}</div>
            <div className={promptBoxStyle.description}>{item.description}</div>
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
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
