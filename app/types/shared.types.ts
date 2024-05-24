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
