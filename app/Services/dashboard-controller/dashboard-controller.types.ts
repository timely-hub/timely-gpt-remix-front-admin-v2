import { StatisticsMemberType } from "~/components/Dashboard/types";
import { PromptType, SpaceType } from "~/types/shared.types";

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
