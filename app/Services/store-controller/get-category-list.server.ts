import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { CategoryType } from "./store-controller.types";

export default async function getCategoryList(args: LoaderFunctionArgs) {
  const fetcher = await loadFetcher(args);
  const response = await fetcher<CategoryType>("/category/list", {
    cache: "no-cache",
  });
  return response;
}
