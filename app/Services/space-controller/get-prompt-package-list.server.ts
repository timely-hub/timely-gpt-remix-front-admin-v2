import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { PromptPackageListType } from "./space-controller.types";

export default async function getPromptPackageList(args: LoaderFunctionArgs) {
  const fetcher = await loadFetcher(args);
  const response = await fetcher<PromptPackageListType[]>(
    "/admin/master/category/list",
    {
      cache: "no-cache",
    }
  );
  return response;
}
