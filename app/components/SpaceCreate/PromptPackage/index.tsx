import Box, { Div, Flex } from "~/components/Box";
import { spaceCreateStyle } from "../styles.css";
import { loader } from "~/routes/space.create.prompt-package";
import { PromptPackageListType } from "~/Services/space-controller/space-controller.types";
import { useEffect, useMemo, useState } from "react";
import { vars } from "~/styles/vars.css";
import { useLoaderData } from "@remix-run/react";
import ArrowDown from "~/assets/icons/ArrowDown.svg?react";

export default function PromptPackage() {
  const { packageList } = useLoaderData<typeof loader>();

  const [promptPackageList, setPromptPackageList] =
    useState<PromptPackageListType[]>();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const toggleCheckbox = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    if (!packageList) return;
    setPromptPackageList(packageList);
  }, [packageList]);

  return (
    <Box margin={"0 auto"} padding={"32px"} width={"100%"}>
      <div className={spaceCreateStyle.title}>프롬프트 꾸러미 선택</div>
      <Flex flexDirection={"column"} gap={"8px"}>
        {promptPackageList?.map((item) => (
          <label id={`promptPackage-${item.id}`} key={item.id}>
            <Box
              border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
              padding={"16px"}
            >
              <Box display={"flex"} gap={"8px"}>
                <input
                  type="checkbox"
                  name={`promptPackage-${item.id}`}
                  checked={checkedItems[item.id] || false}
                  onChange={() => toggleCheckbox(item.id)}
                />
                <p>{item.id}</p>
                <p>{item.label}</p>
                <Div marginLeft={"auto"}>
                  <ArrowDown></ArrowDown>
                </Div>
              </Box>
              {checkedItems[item.id] &&
                item.promptIdList.map((promptId, index) => {
                  return (
                    <Flex gap={"16px"} padding={"16px"} key={index}>
                      <Box
                        border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
                        flex={1}
                        padding={"16px"}
                      >
                        <p>{promptId}</p>
                      </Box>
                    </Flex>
                  );
                })}
            </Box>
          </label>
        ))}
      </Flex>
    </Box>
  );
}
