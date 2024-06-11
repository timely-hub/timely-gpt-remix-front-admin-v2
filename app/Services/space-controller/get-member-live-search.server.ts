import { LoaderFunctionArgs } from "@remix-run/node";
import {
  DefaultTableListCursorQueryParamsType,
  defaultTableListCursorQueryDefault,
} from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { MemberSearchType } from "./space-controller.types";

export const getMemberLiveSearch =
  (args: LoaderFunctionArgs) =>
  async (queryParams: DefaultTableListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      defaultTableListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<MemberSearchType[]>(
      `/admin/member/list/live?${parsed}`
    );
    return response;
  };
