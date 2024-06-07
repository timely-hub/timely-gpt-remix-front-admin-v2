import { ActionFunctionArgs } from "@remix-run/node";
import { updatePromptPackage } from "~/Services/store-controller/update-prompt-package.server";

export const action = async (args: ActionFunctionArgs) => {
  const { id } = args.params;
  return await updatePromptPackage(args)(id || "");
};
