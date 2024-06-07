import { LoaderFunctionArgs } from "@remix-run/node";
import { CursorResponse } from "~/types/api";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import {
  SpaceStatisticsMemberListCursorType,
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "./space-statistics-controller.types";

export const getUserStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: StatisticsListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<
      CursorResponse<SpaceStatisticsMemberListCursorType>
    >(`/admin/stats/space/${id}/member?${parsed}`, {
      cache: "no-cache",
    });
    return response;
  };
