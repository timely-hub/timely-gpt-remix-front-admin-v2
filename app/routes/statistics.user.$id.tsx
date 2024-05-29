import { LoaderFunctionArgs } from "@remix-run/node";
import { getSpaceInfo } from "~/Services/space-controller/get-space-info.$id.server";
import UserStatistics from "~/components/Statistics/UserStatistics";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const spaceInfo = await getSpaceInfo(args)(id || "");
  return {
    spaceInfo: spaceInfo?.data,
    spaceId: id,
  };
};

export default function UserStatisticsPage() {
  return <UserStatistics />;
}