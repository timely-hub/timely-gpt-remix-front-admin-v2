import { LoaderFunctionArgs } from "@remix-run/node";
import { DashBoardType } from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";

export default async function getDashboard(args: LoaderFunctionArgs) {
  const fetcher = await loadFetcher(args);
  const response = await fetcher<DashBoardType>("/admin/dashboard", {
    cache: "no-cache",
  });
  return response;
}
