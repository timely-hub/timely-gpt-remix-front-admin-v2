import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FontStyleProps } from "~/components/Box/types";
import { SprinklesOmit } from "~/styles/rainbow-sprinkles.css";
import { SpaceGradeType } from "./enum.types";

type ISODateString = string;

export type DivProps = FontStyleProps &
  SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >;

export type UserInfoType = {
  id: string; // UUID
  email: string;
  kakaoId: string | null;
  googleId: string | null;
  name: string | null;
  gender: GenderType | null;
  phone: string | null;
  zipCode: string | null;
  address: string | null;
  detailAddress: string | null;
  roleType: UserRoleType | null;
  spaceMemberRoleType: SpaceRoleType | null;
  createdAt: string;
  updatedAt: string | null;
  agreementDate: string | null;
  profileImage: TimelyFileType | null;
};

export interface SpaceMainType {
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

export const modelCategoryTypeLabel = {
  PROMPT: "대화형",
  IMAGE: "이미지 생성",
  VISION: "이미지 분석",
  AUDIO: "음성",
} as const;

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
