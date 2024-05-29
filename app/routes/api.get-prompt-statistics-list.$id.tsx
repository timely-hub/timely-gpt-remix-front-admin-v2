import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getPromptStatisticsList } from "~/Services/space-statistics-controller/get-prompt-statistics-by-id.server";
import { spaceListCursorQueryDefault } from "~/Services/space-statistics-controller/space-statistics-controller.types";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const { id } = args.params;
  const currentParams = getQueryParams(
    searchParams,
    spaceListCursorQueryDefault
  );
  const response = await getPromptStatisticsList(args)(id || "", currentParams);
  return json(response);
};
