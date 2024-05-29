import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { DashBoardType } from "./dashboard-controller.types";

export default async function getDashboard(args: LoaderFunctionArgs) {
  const fetcher = await loadFetcher(args);
  const response = await fetcher<DashBoardType>("/admin/dashboard", {
    cache: "no-cache",
  });
  console.log(response)
  return response;
}
