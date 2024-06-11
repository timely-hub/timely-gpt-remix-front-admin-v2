import { LoaderFunctionArgs } from "@remix-run/node";
import { CursorResponse } from "~/types/api";
import {
  DefaultTableListCursorQueryParamsType,
  defaultTableListCursorQueryDefault,
} from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { SpaceStatisticsPromptListCursorType } from "./space-statistics-controller.types";

export const getPromptStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: DefaultTableListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      defaultTableListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<
      CursorResponse<SpaceStatisticsPromptListCursorType>
    >(`/admin/stats/space/${id}/prompt?${parsed}`, {});
    return response;
  };
