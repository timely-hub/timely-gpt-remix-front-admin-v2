import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import {
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "../space-statistics-controller/space-statistics-controller.types";

export const getUserList =
  (args: LoaderFunctionArgs) =>
  async (queryParams: StatisticsListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    console.log(`/admin/member/list?${parsed}`);
    const response = await fetcher(`/admin/member/list?${parsed}`, {});
    console.log(response);
    return response;
  };
