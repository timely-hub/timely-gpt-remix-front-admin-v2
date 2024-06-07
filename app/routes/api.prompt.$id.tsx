import { ActionFunctionArgs } from "@remix-run/node";
import { deletePromptById } from "~/Services/store-controller/delete-prompt-by-id.server";

export const action = async (args: ActionFunctionArgs) => {
  return await deletePromptById(args);
};
