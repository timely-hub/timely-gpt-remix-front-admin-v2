import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import {
  SpaceStatisticsMemberListCursorType,
  SpaceStatisticsPromptListCursorType,
  SpaceStatisticsQueryParamsType,
  SpaceStatisticsTokenUsageQueryParamsType,
  SpaceStatisticsTokenUsageType,
  spaceStatisticsListQueryDefault,
  spaceStatisticsTokenUsageQueryDefault,
} from "./space-statistics-controller.types";

export const getSpaceStatsNewMemberById =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: SpaceStatisticsQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceStatisticsListQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<SpaceStatisticsMemberListCursorType[]>(
      `/admin/stats/space/${id}/new-member/list?${parsed}`,
      {
        cache: "no-cache",
      }
    );
    return response;
  };

export const getSpaceStatsNewPromptById =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: SpaceStatisticsQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceStatisticsListQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<SpaceStatisticsPromptListCursorType[]>(
      `/admin/stats/space/${id}/new-prompt/list?${parsed}`,
      {
        cache: "no-cache",
      }
    );
    return response;
  };

export const getSpaceStatsTokenUsage =
  (args: LoaderFunctionArgs) =>
  async (id: string, queryParams: SpaceStatisticsTokenUsageQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceStatisticsTokenUsageQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<SpaceStatisticsTokenUsageType>(
      `/admin/stats/space/${id}/token-usage?${parsed}`,
      {
        cache: "no-cache",
      }
    );
    return response;
  };
