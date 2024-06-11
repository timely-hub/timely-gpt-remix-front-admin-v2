import { Form } from "@remix-run/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { FormEvent, useMemo, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { VirtuosoGrid } from "react-virtuoso";
import { PackagePromptListCursorType } from "~/Services/store-controller/store-controller.types";
import Download from "~/assets/icons/Download.svg?react";
import OutlineEye from "~/assets/icons/OutlineEye.svg?react";
import Search from "~/assets/icons/Search.svg?react";
import Box, { Div, Flex } from "~/components/Box";
import Buttons from "~/components/Box/Buttons";
import Checkbox from "~/components/Box/Checkbox";
import Loading from "~/components/Box/Loading";
import ModalContainer from "~/components/Box/Modal/Container";
import TextInput from "~/components/Box/TextInput";
import { promptBoxStyle } from "~/styles/share.css";
import { vars } from "~/styles/vars.css";
import { ApiResponseType, CursorResponse } from "~/types/api";
import {
  DefaultTableListCursorQueryParamsType,
  defaultTableListCursorQueryDefault,
  llmModelCategoryTypeLabel,
} from "~/types/shared.types";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { callToast } from "~/zustand/toastSlice";
import { buttonLoadingStyle } from "../styles.css";

interface ModalPromptProps {
  id: string;
  label: string;
  existPromptIdList: number[];
  onClose: () => void;
}

type QueryParamsType = {
  keyword: string;
  order: string;
  basis: string;
  name: string;
  categoryId: string;
};

type PromptPackageParamsType = {
  label: string;
  promptIdList: number[];
};

const getMyPackagePromptModalList = async (
  queryParams: DefaultTableListCursorQueryParamsType
) => {
  queryParams = omitUnusedSearchParams(
    defaultTableListCursorQueryDefault,
    queryParams
  );
  const parsed = objectToQueryParams({ ...queryParams });
  const res = await fetch(`/api/get-package-prompt-list?${parsed}`);
  return (await res.json()) as ApiResponseType<
    CursorResponse<PackagePromptListCursorType>
  >;
};

const updatePromptPackage = async (
  id: string | number,
  data: PromptPackageParamsType
) => {
  const response = await fetch(`/api/update-prompt-package/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJson = (await response.json()) as ApiResponseType<unknown>;
  return responseJson;
};

export default function ModalPromptComponent({
  id,
  label,
  existPromptIdList,
  onClose,
}: ModalPromptProps) {
  const virtuoso = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [activeIds, setActiveIds] = useState<Set<number>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    keyword: "",
    order: "desc",
    basis: "",
    name: "",
    categoryId: "",
  });

  const [parsedQueryParams, setParsedQueryParams] = useState<QueryParamsType>({
    keyword: "",
    order: "desc",
    basis: "",
    name: "",
    categoryId: "",
  });
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["/package/prompt/list", parsedQueryParams],
      queryFn: async ({ pageParam }) => {
        const res = await getMyPackagePromptModalList({
          cursor: pageParam?.toString() || "",
          take: "12",
          ...parsedQueryParams,
        });
        setLoading(false);
        return res;
      },
      initialPageParam: null as number | null,
      getPreviousPageParam: (firstPage) => {
        return firstPage?.data?.paging.cursor || null;
      },
      getNextPageParam: (lastPage) => {
        return lastPage?.data?.paging.cursor || null;
      },
    });

  const itemList = useMemo(() => {
    return data?.pages.map((page) => page?.data?.list ?? []).flat();
  }, [data]);
  const totalCount: number = useMemo(() => {
    const groupCounts = (data?.pages.map(
      (page) => page?.data?.list.length ?? []
    ) ?? []) as number[];
    return groupCounts.reduce((acc, cur) => acc + cur, 0);
  }, [data]);

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>,
    newQueryParams?: QueryParamsType
  ) => {
    e?.preventDefault();
    const clonedQueryParams = newQueryParams ?? queryParams;
    if (newQueryParams) setQueryParams(clonedQueryParams);
    setParsedQueryParams({
      ...clonedQueryParams,
    });
    refetch();
  };

  const handleItemClick = (id: number) => {
    setActiveIds((prev) => {
      if (prev.has(id)) {
        return new Set([...prev].filter((activeId) => activeId !== id));
      } else {
        return new Set([...prev, id]);
      }
    });

    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      {loading && <Loading />}
      <ModalContainer
        onClose={onClose}
        title="꾸러미에 추가"
        width={"1040px"}
        height={"622px"}
      >
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextInput
            placeholder={"검색어를 입력해주세요."}
            wrapSprinkles={{ width: "100%", marginBottom: "16px" }}
            onChange={(e) => {
              setQueryParams((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            suffix={
              <Buttons backgroundColor={"none"} type="submit">
                <Search />
              </Buttons>
            }
          />
        </Form>
        <Box
          padding={"24px 16px"}
          border={`1px solid ${vars.colors["Grayscale/Gray 100"]}`}
          borderRadius={"16px"}
          height={"396px"}
          overflow={"hidden"}
        >
          <VirtuosoGrid
            style={{ height: "400px", display: "flex" }}
            ref={virtuoso}
            listClassName={promptBoxStyle.wrap}
            itemContent={(_, item) => {
              return (
                <Box
                  className={clsx(
                    promptBoxStyle.modalBox,
                    checkedItems[item.id] ? promptBoxStyle.checked : ""
                  )}
                  key={item.id}
                >
                  <label id={`prompt-${item.id}`}>
                    <Flex gap={"8px"}>
                      <Checkbox
                        name={`prompt-${item.id}`}
                        active={checkedItems[item.id]}
                        onClick={() => handleItemClick(item.id)}
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
              );
            }}
            data={itemList ?? []}
            endReached={() => {
              !isFetchingNextPage && hasNextPage && fetchNextPage();
            }}
            totalCount={totalCount}
            components={{
              Item: ({ children }) => {
                return <Box width={"24%"}>{children}</Box>;
              },
              Footer: () => {
                return (
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                    padding={isFetchingNextPage ? "8px 0" : "0"}
                    transition={"padding 0.3s"}
                  >
                    <Buttons
                      onClick={() => {
                        fetchNextPage();
                      }}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage ? (
                        <div className={buttonLoadingStyle}>
                          <BiLoaderAlt />
                        </div>
                      ) : hasNextPage ? (
                        "더 보기"
                      ) : (
                        ""
                      )}
                    </Buttons>
                  </Flex>
                );
              },
            }}
          />
        </Box>
        <Flex justifyContent={"space-between"}>
          <Div display={"inherit"} alignItems={"center"} gap={"8px"}>
            <Buttons
              theme={"dangerGhostFilled"}
              size={"small"}
              onClick={() => {
                setActiveIds(new Set());
                setCheckedItems({});
              }}
            >
              전체 해제
            </Buttons>
            <p>({activeIds.size} 개 선택)</p>
          </Div>
          <Div display={"inherit"} gap={"8px"}>
            <Buttons theme={"grayscaleFilled"} size={"small"} onClick={onClose}>
              취소
            </Buttons>
            <Buttons
              theme={"primaryFilled"}
              size={"small"}
              onClick={async () => {
                const response = await updatePromptPackage(id, {
                  label,
                  promptIdList: Array.from(activeIds).concat(existPromptIdList),
                });
                if (response.success) {
                  callToast("꾸러미가 성공적으로 추가되었습니다.", "success");
                  onClose();
                }
              }}
            >
              추가하기
            </Buttons>
          </Div>
        </Flex>
      </ModalContainer>
    </>
  );
}
