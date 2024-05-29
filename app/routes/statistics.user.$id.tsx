import { LoaderFunctionArgs } from "@remix-run/node";
import UserStatistics from "~/components/Statistics/UserStatistics";
import { getSpaceInfo } from "~/services/space-controller/get-space-info.$id.server";

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
