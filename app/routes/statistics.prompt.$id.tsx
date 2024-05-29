import { LoaderFunctionArgs } from "@remix-run/node";
import PromptStatistics from "~/components/Statistics/PromptStatistics";
import { getSpaceInfo } from "~/services/space-controller/get-space-info.$id.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const spaceInfo = await getSpaceInfo(args)(id || "");
  return {
    spaceInfo: spaceInfo?.data,
    spaceId: id,
  };
};

export default function PromptStatisticsPage() {
  return <PromptStatistics />;
}
