import { MemberType, PromptType, SpaceType } from "~/types/shared.types";

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
