import { LoaderFunctionArgs } from "@remix-run/node";
import {
  SpaceStatisticsMemberListCursorType,
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "./space-statistics-controller.types";
import { CursorResponse } from "~/types/api";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";

export const getUserStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: StatisticsListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    console.log(`/admin/stats/space/${id}/member?${parsed}`);
    const response = await fetcher<
      CursorResponse<SpaceStatisticsMemberListCursorType>
    >(`/admin/stats/space/${id}/member?${parsed}`, {
      cache: "no-cache",
    });
    console.log(response);
    return response;
  };
