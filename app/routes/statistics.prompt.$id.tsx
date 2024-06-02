import { LoaderFunctionArgs } from "@remix-run/node";
import { getSpaceDomain } from "~/Services/space-controller/get-space-domain-by-id.server";

import PromptStatistics from "~/components/Statistics/PromptStatistics";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const spaceDomain = await getSpaceDomain(args)(id || "");
  return {
    spaceDomain: spaceDomain?.data,
    spaceId: id,
  };
};

export default function PromptStatisticsPage() {
  return <PromptStatistics />;
}
