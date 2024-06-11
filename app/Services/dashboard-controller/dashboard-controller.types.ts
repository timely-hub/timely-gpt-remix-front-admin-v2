import { SpaceRoleType } from "~/types/shared.types";
export type DashBoardType = {
  totalMemberCount: number;
  totalSpaceCount: number;
  totalPromptCount: number;
  todayTotalCreditUsed: number;
  thisMonthTotalCreditUsed: number;
  bestPromptList: PromptType[];
  recentJoinMemberList: StatisticsMemberType[];
  recentCreatedSpaceList: SpaceType[];
  recentCreatedPromptList: PromptType[];
};

export type TotalCountProps = {
  totalMemberCount: number;
  totalSpaceCount: number;
  totalPromptCount: number;
  todayTotalCreditUsed: number;
  thisMonthTotalCreditUsed: number;
};

export type PromptType = {
  name: string;
  description?: string;
  categoryLabel: string;
  viewCount: number;
  executeCount: number;
  createdAt: string;
};

export type StatisticsMemberType = {
  name: string;
  email: string;
  spaceName: string;
  spaceRoleType: SpaceRoleType | null;
  roleLabel: string;
  executeCount: number;
  createdAt: string;
};

export type SpaceType = {
  name: string;
  domain: string;
  memberCount: number;
  promptCount: number;
  credit: number;
  usedCredit: number;
  usableCredit: number;
  ownerEmail: string;
  createdAt: string;
};
