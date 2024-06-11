import { LoaderFunctionArgs } from "@remix-run/node";

import { getPackagePromptList } from "~/Services/store-controller/get-prompt-list.server";
import { defaultTableListCursorQueryDefault } from "~/types/shared.types";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const currentParams = getQueryParams(
    searchParams,
    defaultTableListCursorQueryDefault
  );
  const response = await getPackagePromptList(args)(currentParams);
  return response;
};
