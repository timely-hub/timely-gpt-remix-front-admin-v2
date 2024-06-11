import { SpaceRoleType } from "~/types/shared.types";

export interface PromptTable {
  promptName: string;
  description?: string;
  category: string;
  view: number;
  request: number;
  createAt: string;
  recentRequestAt: string;
}

export interface UserTable {
  name: string;
  email: string;
  space: string;
  type: string;
  connectCount: number;
  requestCount: number;
  signInAt: string;
}

export interface SpaceTable {
  space: string;
  domain: string;
  memberCount: number;
  promptCount: number;
  totalToken: number;
  totalUseToken: number;
  remainingToken: number;
  user?: string;
  createAt?: string;
  expirationDate?: string;
}

export type SpaceListCursorType = {
  id: string;
  name: string;
  domain: string;
  memberCount: number;
  promptCount: number;
  credit: number;
  usedCredit: number;
  usableCredit: number;
  expiredAt: string;
};

export type SpaceStatisticsMemberListCursorType = {
  id: string;
  spaceMemberId?: number;
  memberName: string;
  memberEmail: string;
  roleType?: SpaceRoleType | null;
  executeCount?: number;
  promptCount?: number;
  promptIdList?: number[];
  createdAt?: string;
};

export type SpaceStatisticsPromptListCursorType = {
  id?: number;
  authorId: string;
  promptId?: number;
  name: string;
  description: string;
  categoryId: number;
  categoryLabel?: string;
  viewCount: number;
  executeCount: number;
  createdAt?: string;
};

export type UserListCursorType = {
  id: string;
  name: string;
  email: string;
  spaceName: string;
  spaceMemberRoleType: SpaceRoleType | null;
  promptExecutedCount: number;
  lastAccessedAt: string;
  createdAt: string;
  updatedAt: string;
};

export interface SpaceStatisticsTokenUsageType {
  credit: number;
  usedCreditThisMonth: number;
  usedCredit: number;
  usableCredit: number;
}

export const spaceStatisticsTokenUsageQueryDefault = {
  year: "2024",
  month: "1",
};

export type SpaceStatisticsTokenUsageQueryParamsType = Partial<
  typeof spaceStatisticsTokenUsageQueryDefault
>;

export type StorePromptListType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  member: MemberType;
  categoryId: number;
  llmModelType: string;
  llmModelCategoryType: string;
  viewCount: number;
  bookmarkCount: number;
  executeCount: number;
  executeCountSnapshot: number;
  createdAt: string;
  updatedAt: string;
};

export interface MemberType {
  id: string;
  name: string;
  profileImageUrl: string;
}
