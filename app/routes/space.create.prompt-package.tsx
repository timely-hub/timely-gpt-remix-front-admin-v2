import { LoaderFunctionArgs } from "@remix-run/node";
import getPromptPackageList from "~/Services/space-controller/get-prompt-package-list.server";
import PromptPackage from "~/components/SpaceCreate/PromptPackage";

export const loader = async (args: LoaderFunctionArgs) => {
  const packageList = await getPromptPackageList(args);
  return {
    packageList: packageList?.data ?? null,
  };
};

export default function SpacePromptPackagePage() {
  return <PromptPackage />;
}
