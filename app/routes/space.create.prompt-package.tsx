import { LoaderFunctionArgs, json } from "@remix-run/node";
import getPromptPackageList from "~/Services/space-controller/get-prompt-package-list.server";
import PromptPackage from "~/components/SpaceCreate/PromptPackage";

export const loader = async (args: LoaderFunctionArgs) => {
  const packageList = await getPromptPackageList(args);
  return json({ packageList: packageList?.data });
};

export default function SpacePromptPackagePage() {
  return <PromptPackage />;
}
