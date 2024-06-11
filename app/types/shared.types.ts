import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FontStyleProps } from "~/components/Box/types";
import { SprinklesOmit } from "~/styles/rainbow-sprinkles.css";

type ISODateString = string;

export type DivProps = FontStyleProps &
  SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >;

export interface SpaceMainType {
  id: string;
  domain: string;
  name: string;
  grade: SpaceGradeType | null;
  ownerId: string;
  openAiKey: string;
  expiredAt: ISODateString | null;
  topMenuImageUrl: string | null;
  topMainLogoImageUrl: string | null;
  visibleMainBanner: boolean;
  visibleRecommendPrompt: boolean;
  visibleBestPrompt: boolean;
  visibleMoreInfo: boolean;
  organizationName: string | null;
  phone: string | null;
  zipCode: string | null;
  address: string | null;
  detailAddress: string | null;
  seoTitle: string | null;
  seoIconImageUrl: string | null;
  seoDescription: string | null;
  opengraphTitle: string | null;
  opengraphImageUrl: string | null;
  opengraphDescription: string | null;
  recommendPromptIdList: number[];
  spacePayment: SpacePaymentType;
  spaceDashboardList: SpaceDashboardListType[];
  tokenUsage?: number;
  credit?: number;
  usedCredit?: number;
}

export const defaultSpaceMainType: SpaceMainType = {
  id: "",
  domain: "",
  name: "",
  grade: "BASIC",
  ownerId: "",
  openAiKey: "",
  expiredAt: null,
  topMenuImageUrl: null,
  topMainLogoImageUrl: null,
  visibleMainBanner: false,
  visibleRecommendPrompt: false,
  visibleBestPrompt: false,
  visibleMoreInfo: false,
  organizationName: null,
  phone: null,
  zipCode: null,
  address: null,
  detailAddress: null,
  seoTitle: null,
  seoIconImageUrl: null,
  seoDescription: null,
  opengraphTitle: null,
  opengraphImageUrl: null,
  opengraphDescription: null,
  recommendPromptIdList: [],
  spacePayment: {
    payerName: "",
    type: "",
    amount: 0,
    description: "",
  },
  spaceDashboardList: [],
};

export const defaultTableListCursorQueryDefault = {
  keyword: "",
  cursor: "",
  take: "10",
  order: "asc",
  basis: "",
  categoryId: "",
};

export type DefaultTableListCursorQueryParamsType = Partial<
  typeof defaultTableListCursorQueryDefault
>;

export const modelCategoryTypeLabel = {
  PROMPT: "대화형",
  IMAGE: "이미지 생성",
  VISION: "이미지 분석",
  AUDIO: "음성",
} as const;

export const spaceRoleLabel = {
  ROLE_SPACE_ADMIN: "관리자",
  ROLE_SPACE_OWNER: "소유자",
  ROLE_SPACE_USER: "멤버",
  ROLE_SPACE_GUEST: "게스트",
} as const;

export type SpaceRoleType = keyof typeof spaceRoleLabel;
export type SpaceRoleValueType = (typeof spaceRoleLabel)[SpaceRoleType];

export const isSpaceRoleType = (arg: unknown): arg is SpaceRoleType => {
  return (arg as SpaceRoleType) in spaceRoleLabel;
};
export const isSpaceRoleValueType = (
  arg: unknown
): arg is SpaceRoleValueType => {
  return Object.values(spaceRoleLabel).includes(arg as SpaceRoleValueType);
};

export const userRoleLabel = {
  ROLE_GUEST: "게스트",
  ROLE_USER: "일반",
  ROLE_ADMIN: "관리자",
};

export type UserRoleType = keyof typeof userRoleLabel;
export type UserRoleValueType = (typeof userRoleLabel)[UserRoleType];

export const isUserRoleType = (arg: unknown): arg is UserRoleType => {
  return (arg as UserRoleType) in userRoleLabel;
};

export const isUserRoleValueType = (arg: unknown): arg is UserRoleValueType => {
  return Object.values(userRoleLabel).includes(arg as UserRoleValueType);
};

export const spaceGradeLabel = {
  BASIC: "영업용(체험판)",
  PREMIUM: "베이직",
  MASTER: "프로",
} as const;

export type SpaceGradeType = keyof typeof spaceGradeLabel;
export type SpaceGradeValueType = (typeof spaceGradeLabel)[SpaceGradeType];

export const isSpaceGradeType = (arg: unknown): arg is SpaceGradeType => {
  return (arg as SpaceGradeType) in spaceGradeLabel;
};

export const isSpaceGradeValueType = (
  arg: unknown
): arg is SpaceGradeValueType => {
  return Object.values(spaceGradeLabel).includes(arg as SpaceGradeValueType);
};

export const llmModelCategoryTypeLabel = {
  PROMPT: "대화형",
  IMAGE: "이미지 생성",
  VISION: "이미지 분석",
  AUDIO: "음성",
} as const;

export type LlmModelType = keyof typeof llmModelCategoryTypeLabel;
export type LlmModelValueType =
  (typeof llmModelCategoryTypeLabel)[LlmModelType];

export const isLlmModelType = (arg: unknown): arg is LlmModelType => {
  return (arg as LlmModelType) in llmModelCategoryTypeLabel;
};

export const isLlmModelValueType = (arg: unknown): arg is LlmModelValueType => {
  return Object.values(llmModelCategoryTypeLabel).includes(
    arg as LlmModelValueType
  );
};

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

export interface SpacePaymentType {
  payerName: string;
  type: string;
  amount: number;
  description: string;
}

export interface SpaceDashboardListType {
  promptId: number;
  type: string;
}

export type ButtonProps = FontStyleProps &
  SprinklesOmit<
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;
