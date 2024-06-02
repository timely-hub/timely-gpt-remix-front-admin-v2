import { LoaderFunctionArgs } from "@remix-run/node";
import getPromptPackageList from "~/Services/space-controller/get-prompt-package-list.server";
import PackageComponent from "~/components/Store/Package";

export const loader = async (args: LoaderFunctionArgs) => {
  const storeCategoryList = await getPromptPackageList(args);
  return {
    storeCategoryList: storeCategoryList?.data,
  };
};

export default function StoreCategoryPage() {
  return <PackageComponent />;
}
