import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getMemberLiveSearch } from "~/Services/space-controller/get-member-live-search.server";
import { spaceMemberSearchQueryDefault } from "~/Services/space-controller/space-controller.types";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const currentParams = getQueryParams(
    searchParams,
    spaceMemberSearchQueryDefault
  );
  const response = await getMemberLiveSearch(args)(currentParams);
  return json({ response: response?.data });
};
