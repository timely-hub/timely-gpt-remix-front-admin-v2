import { LoaderFunctionArgs } from "@remix-run/node";
import {
  SpaceStatisticsPromptListCursorType,
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "~/services/space-statistics-controller/space-statistics-controller.types";
import { CursorResponse } from "~/types/api";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";

export const getPromptStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: StatisticsListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    console.log(`/admin/stats/space/${id}/prompt?${parsed}`);
    const response = await fetcher<
      CursorResponse<SpaceStatisticsPromptListCursorType>
    >(`/admin/stats/space/${id}/prompt?${parsed}`, {
      cache: "no-cache",
    });
    console.log(response);
    return response;
  };
