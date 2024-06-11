import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getStorePromptList } from "~/Services/store-controller/get-store-prompt-list.server";
import { defaultTableListCursorQueryDefault } from "~/types/shared.types";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const currentParams = getQueryParams(
    searchParams,
    defaultTableListCursorQueryDefault
  );
  const response = await getStorePromptList(args)(currentParams);
  return json(response);
};
