import { LoaderFunctionArgs } from "@remix-run/node";
import { SpaceMainType } from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";

export const getSpaceInfo =
  (args: LoaderFunctionArgs) => async (id: string) => {
    const fetcher = await loadFetcher(args);
    const response = await fetcher<SpaceMainType>(`/space/${id}`);
    return response;
  };
