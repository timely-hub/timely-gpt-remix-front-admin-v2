import { LoaderFunctionArgs } from "@remix-run/node";
import {
  StorePromptListQueryParamsType,
  StorePromptListType,
  spaceListCursorQueryDefault,
} from "../space-statistics-controller/space-statistics-controller.types";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import { loadFetcher } from "~/utils/fetcher";
import { CursorResponse } from "~/types/api";

export const getStorePromptList =
  (args: LoaderFunctionArgs) =>
  async (queryParams: StorePromptListQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      spaceListCursorQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    console.log(`/prompt/list?${parsed}`);
    const response = await fetcher<CursorResponse<StorePromptListType>>(
      `/prompt/list?${parsed}`,
      {}
    );
    console.log(response);
    return response;
  };
