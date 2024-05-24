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
  roleType?: string;
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

export interface SpaceStatisticsTokenUsageType {
  credit: number;
  usedCreditThisMonth: number;
  usedCredit: number;
  usableCredit: number;
}

export const spaceListCursorQueryDefault = {
  keyword: "",
  cursor: "",
  take: "10",
  order: "asc",
  basis: "",
};

export type SpaceListCursorQueryParamsType = Partial<
  typeof spaceListCursorQueryDefault
>;

export const userListCursorQueryDefault = {
  id: "",
  keyword: "",
  cursor: "",
  take: "10",
  order: "asc",
  basis: "",
};

export type UserListCursorQueryParamsType = Partial<
  typeof userListCursorQueryDefault
>;

export const spaceStatisticsListQueryDefault = {
  take: "10",
};

export type SpaceStatisticsQueryParamsType = Partial<
  typeof spaceStatisticsListQueryDefault
>;

export const spaceStatisticsTokenUsageQueryDefault = {
  year: "2024",
  month: "1",
};

export type SpaceStatisticsTokenUsageQueryParamsType = Partial<
  typeof spaceStatisticsTokenUsageQueryDefault
>;
