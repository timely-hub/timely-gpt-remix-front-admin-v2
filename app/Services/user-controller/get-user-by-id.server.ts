import { LoaderFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";
import { UserDetailType } from "./user-controller.types";

export const getUserInfo = (args: LoaderFunctionArgs) => async (id: string) => {
  const fetcher = await loadFetcher(args);
  const response = await fetcher<UserDetailType>(`/admin/member/${id}`);
  return response;
};
