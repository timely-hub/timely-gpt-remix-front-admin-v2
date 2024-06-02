import { LoaderFunctionArgs } from "@remix-run/node";
import { getSpaceInfo } from "~/Services/space-controller/get-space-info-by-id.server";
import SpaceInfoComponent from "~/components/SpaceInfo";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const spaceInfo = await getSpaceInfo(args)(id || "");
  return {
    spaceInfo: spaceInfo?.data,
  };
};
export default function SpaceListInfoPage() {
  return <SpaceInfoComponent />;
}
