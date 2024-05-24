import { LoaderFunctionArgs } from "@remix-run/node";
import SpaceStatistics from "~/components/Statistics/SpaceStatistics";
import {
  getSpaceStatsNewMemberById,
  getSpaceStatsNewPromptById,
  getSpaceStatsTokenUsage,
} from "~/services/space-statistics-controller/get-space-statistics-by-id.server";
import {
  spaceStatisticsListQueryDefault,
  spaceStatisticsTokenUsageQueryDefault,
} from "~/services/space-statistics-controller/space-statistics-controller.types";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const { id } = args.params;
  const currentParams = getQueryParams(
    searchParams,
    spaceStatisticsListQueryDefault
  );
  const statsRecentMember = await getSpaceStatsNewMemberById(args)(
    id || "",
    currentParams
  );

  const statsRecentPrompt = await getSpaceStatsNewPromptById(args)(
    id || "",
    currentParams
  );

  const currentTokenUsageParams = getQueryParams(
    searchParams,
    spaceStatisticsTokenUsageQueryDefault
  );
  const tokenUsage = await getSpaceStatsTokenUsage(args)(
    id || "",
    currentTokenUsageParams
  );
  return {
    statsRecentMember: statsRecentMember.data ?? null,
    statsRecentPrompt: statsRecentPrompt.data ?? null,
    tokenUsage: tokenUsage.data ?? null,
  };
};

export default function SpaceStatisticsPage() {
  return <SpaceStatistics />;
}
