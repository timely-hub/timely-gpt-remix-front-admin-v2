import { LoaderFunctionArgs } from "@remix-run/node";
import { getPromptInfo } from "~/Services/space-controller/get-prompt-info-by-id.server";
import getPromptPackageList from "~/Services/space-controller/get-prompt-package-list.server";
import PromptPackage from "~/components/SpaceCreate/PromptPackage";

export const loader = async (args: LoaderFunctionArgs) => {
  const packageList = await getPromptPackageList(args);
  if (Array.isArray(packageList?.data)) {
    const promptInfoPromises = packageList.data.map((item) =>
      getPromptInfo(args)(item.id)
    );
    const promptList = await Promise.all(promptInfoPromises);
    const promptDataList = promptList.map((prompt) => prompt.data);

    const packageListWithPromptList = packageList.data.map((packageItem) => {
      const correspondingPromptList = promptDataList.flatMap((promptItem) =>
        promptItem?.filter((item) => packageItem.promptIdList.includes(item.id))
      );
      return {
        ...packageItem,
        promptList: correspondingPromptList,
      };
    });
    console.log(packageListWithPromptList);
    return {
      packageList: packageListWithPromptList,
    };
  }
};

export default function SpacePromptPackagePage() {
  return <PromptPackage />;
}
