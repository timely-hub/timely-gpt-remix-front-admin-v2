import { LoaderFunctionArgs } from "@remix-run/node";
import { storePromptListQueryDefault } from "~/Services/space-statistics-controller/space-statistics-controller.types";
import { getPackagePromptList } from "~/Services/store-controller/get-prompt-list.server";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const currentParams = getQueryParams(
    searchParams,
    storePromptListQueryDefault
  );
  const response = await getPackagePromptList(args)(currentParams);
  return response;
};
