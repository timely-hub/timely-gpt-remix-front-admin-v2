import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import {
  MemberSearchType,
  SpaceMemberSearchQueryParamsType,
  spaceMemberSearchQueryDefault,
} from "./space-controller.types";

export const getMemberLiveSearch =
  (args: LoaderFunctionArgs) =>
  async (queryParams: SpaceMemberSearchQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceMemberSearchQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<MemberSearchType[]>(
      `/admin/member/list/live?${parsed}`
    );
    return response;
  };
