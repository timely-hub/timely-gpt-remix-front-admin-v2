import { LoaderFunctionArgs } from "@remix-run/node";
import { CursorResponse } from "~/types/api";
import { loadFetcher } from "~/utils/fetcher";
import { objectToQueryParams, omitUnusedSearchParams } from "~/utils/helpers";
import {
  StorePromptListQueryParamsType,
  storePromptListQueryDefault,
} from "../space-statistics-controller/space-statistics-controller.types";
import { PackagePromptListCursorType } from "./store-controller.types";

export const getPackagePromptList =
  (args: LoaderFunctionArgs) =>
  async (queryParams: StorePromptListQueryParamsType) => {
    queryParams = omitUnusedSearchParams(
      storePromptListQueryDefault,
      queryParams
    );
    const parsed = objectToQueryParams({ ...queryParams });
    const fetcher = await loadFetcher(args);
    const response = await fetcher<CursorResponse<PackagePromptListCursorType>>(
      `/prompt/list?${parsed}`,
      {}
    );
    return response;
  };
