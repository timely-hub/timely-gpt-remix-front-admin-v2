import { LoaderFunctionArgs, json } from "@remix-run/node";
import { spaceListCursorQueryDefault } from "~/Services/space-statistics-controller/space-statistics-controller.types";
import { getUserList } from "~/Services/user-controller/get-user-list.server";
import { getQueryParams } from "~/utils/helpers";

export const loader = async (args: LoaderFunctionArgs) => {
  const searchParams = new URL(args.request.url).searchParams;
  const currentParams = getQueryParams(
    searchParams,
    spaceListCursorQueryDefault
  );
  const response = await getUserList(args)(currentParams);
  return json(response);
};
