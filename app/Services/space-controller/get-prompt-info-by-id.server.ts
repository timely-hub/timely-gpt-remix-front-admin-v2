import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { PromptInfoType } from "./space-controller.types";

export const getPromptInfo =
  (args: LoaderFunctionArgs) => async (id: number | string) => {
    const fetcher = await loadFetcher(args);
    const response = await fetcher<PromptInfoType[]>(
      `/admin/master/category/${id}/prompt/list`
    );
    console.log(response);

    return response;
  };
