import { ActionFunctionArgs } from "@remix-run/node";
import { SpaceMainType } from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";

export const createSpace =
  (args: ActionFunctionArgs) => async (spaceData: SpaceMainType) => {
    const fetcher = await loadFetcher(args, "post");
    return await fetcher(`/space`, {
      body: JSON.stringify(spaceData),
      cache: "no-cache",
    });
  };
