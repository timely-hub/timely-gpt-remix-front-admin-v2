import { UserRoleType } from "~/types/shared.types";

export type UserDetailType = {
  id: string;
  email: string;
  provider: string;
  spaceId: string;
  spaceName: string;
  address: string;
  detailAddress: string;
  name: string;
  roleType: UserRoleType | null;
  agreementData: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  promptCreatedCount: number;
  promptImportedCount: number;
  promptExecutedCount: number;
  LastAccessedAt: string;
};
