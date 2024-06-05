export type PromptPackageListType = {
  id: number;
  label: string;
  promptIdList: number[];
  createdAt: string;
  updatedAt: string;
  promptList?: PromptInfoType[];
};

export type PromptInfoType = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  categoryLabel: string;
  llmModelType: string;
  llmModelCategoryType: string;
  viewCount: number;
  bookmarkCount: number;
  executeCount: number;
  createdAt: string;
  updatedAt: string;
  member: PromptMemberType;
};

export interface PromptMemberType {
  id: string;
  name: string;
  profileImageUrl: string;
}

export type MemberSearchType = {
  email: string;
};

export const spaceMemberSearchQueryDefault = {
  keyword: "",
};

export type SpaceMemberSearchQueryParamsType = Partial<
  typeof spaceMemberSearchQueryDefault
>;
