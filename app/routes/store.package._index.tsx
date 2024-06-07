import { LoaderFunctionArgs, json } from "@remix-run/node";
import getPromptPackageList from "~/Services/space-controller/get-prompt-package-list.server";
import PackageComponent from "~/components/Store/Package";

export const loader = async (args: LoaderFunctionArgs) => {
  const promptPackageList = await getPromptPackageList(args);
  return json({ promptPackageList: promptPackageList?.data });
};

export default function StoreCategoryPage() {
  return <PackageComponent />;
}
