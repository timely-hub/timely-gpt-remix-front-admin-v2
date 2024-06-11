import { LoaderFunctionArgs } from "@remix-run/node";
import { CursorResponse } from "~/types/api";
import {
  DefaultTableListCursorQueryParamsType,
  defaultTableListCursorQueryDefault,
} from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { SpaceStatisticsMemberListCursorType } from "./space-statistics-controller.types";

export const getUserStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: DefaultTableListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      defaultTableListCursorQueryDefault,
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
