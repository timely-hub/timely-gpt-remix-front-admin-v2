import { LoaderFunctionArgs } from "@remix-run/node";
import { getSpaceDomain } from "~/Services/space-controller/get-space-domain-by-id.server";
import {
  getSpaceStatsNewMemberById,
  getSpaceStatsNewPromptById,
  getSpaceStatsTokenUsage,
} from "~/Services/space-statistics-controller/get-space-statistics-by-id.server";
import {
  spaceStatisticsListQueryDefault,
  spaceStatisticsTokenUsageQueryDefault,
} from "~/Services/space-statistics-controller/space-statistics-controller.types";
import SpaceStatistics from "~/components/Statistics/SpaceStatistics";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const { id } = args.params;
  const spaceDomain = await getSpaceDomain(args)(id || "");
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
    spaceId: id,
    spaceDomain: spaceDomain?.data,
  };
};

export default function SpaceStatisticsPage() {
  return <SpaceStatistics />;
}
