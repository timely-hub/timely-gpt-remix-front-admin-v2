import { LoaderFunctionArgs } from "@remix-run/node";
import {
  SpaceStatisticsMemberListCursorType,
  UserListCursorQueryParamsType,
  userListCursorQueryDefault,
} from "~/services/space-statistics-controller/space-statistics-controller.types";
import { CursorResponse } from "~/types/api";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";

export const getUserStatisticsList =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: UserListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      userListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    console.log(`/admin/stats/space/${id}/member?${parsed}`);
    const response = await fetcher<
      CursorResponse<SpaceStatisticsMemberListCursorType>
    >(`/admin/stats/space/${id}/member?${parsed}`, {});
    return response;
  };
