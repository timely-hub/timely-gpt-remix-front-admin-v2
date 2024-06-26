import { ActionFunctionArgs } from "@remix-run/node";
import { createCategory } from "~/Services/store-controller/create-category.server";

export const action = async (args: ActionFunctionArgs) => {
  return await createCategory(args)();
};
