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

export type PromptType = {
  name: string;
  description?: string;
  categoryLabel: string;
  viewCount: number;
  executeCount: number;
  createdAt: string;
};

export type MemberType = {
  name: string;
  email: string;
  spaceName: string;
  spaceRoleType: string;
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

export type DashBoardType = {
  totalMemberCount: number;
  totalSpaceCount: number;
  totalPromptCount: number;
  todayTotalCreditUsed: number;
  thisMonthTotalCreditUsed: number;
  bestPromptList: PromptType[];
  recentJoinMemberList: MemberType[];
  recentCreatedSpaceList: SpaceType[];
  recentCreatedPromptList: PromptType[];
};
