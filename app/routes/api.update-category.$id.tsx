import { LoaderFunctionArgs } from "@remix-run/node";
import { updateCategory } from "~/Services/store-controller/update-category.server";

export const action = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  return await updateCategory(args)(id || "");
};
