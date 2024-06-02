import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";

type ISODateString = string;

export interface PromptListType {
  id: number;
  name: string;
  categoryLabel: string;
  imageUrl: string;
  description: string;
  llmModelCategoryType: keyof typeof modelCategoryTypeLabel;
}
export interface CategoryListType {
  id: number;
  label: string;
}

export const modelCategoryTypeLabel = {
  PROMPT: "대화형",
  IMAGE: "이미지 생성",
  VISION: "이미지 분석",
  AUDIO: "음성",
} as const;

export interface SpaceBannerListType {
  id: number;
  name: string;
  spaceId: string;
  displayOrder: number;
  startAt: ISODateString | null;
  endAt: ISODateString | null;
  description: string;
  link: string;
  pcImageUrl: string;
  mobileImageUrl: string;
  createdAt: ISODateString | null;
  updatedAt: ISODateString | null;
}

export type SpaceInfoType = {
  id: string;
  domain: string;
  name: string;
};

export const getSpaceDomain =
  (args: LoaderFunctionArgs) => async (id: string) => {
    const fetcher = await loadFetcher(args);
    const response = await fetcher<SpaceInfoType>(`/space/${id}`);
    console.log(response);
    return response;
  };
