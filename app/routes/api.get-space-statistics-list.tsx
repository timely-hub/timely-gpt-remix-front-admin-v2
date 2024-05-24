import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getSpaceStatisticsList } from "~/services/space-statistics-controller/get-space-ststistics-list.server";
import { spaceListCursorQueryDefault } from "~/services/space-statistics-controller/space-statistics-controller.types";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const currentParams = getQueryParams(
    searchParams,
    spaceListCursorQueryDefault
  );
  const response = await getSpaceStatisticsList(args)(currentParams);
  return json(response);
};
