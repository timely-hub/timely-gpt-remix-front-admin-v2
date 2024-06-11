import { LoaderFunctionArgs } from "@remix-run/node";
import { CursorResponse } from "~/types/api";
import {
  DefaultTableListCursorQueryParamsType,
  defaultTableListCursorQueryDefault,
} from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { StorePromptListType } from "../space-statistics-controller/space-statistics-controller.types";

export const getStorePromptList =
  (args: LoaderFunctionArgs) =>
  async (queryParams: DefaultTableListCursorQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      defaultTableListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<CursorResponse<StorePromptListType>>(
      `/prompt/list?${parsed}`,
      {}
    );
    return response;
  };
