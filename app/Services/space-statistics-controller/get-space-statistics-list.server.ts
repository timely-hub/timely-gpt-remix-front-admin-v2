import { LoaderFunctionArgs } from "@remix-run/node";
import { CursorResponse } from "~/types/api";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import {
  SpaceListCursorType,
  StatisticsListCursorQueryParamsType,
  spaceListCursorQueryDefault,
} from "./space-statistics-controller.types";

export const getSpaceStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (queryParams: StatisticsListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<CursorResponse<SpaceListCursorType>>(
      `/admin/stats/space/list?${parsed}`,
      {}
    );
    return response;
  };
