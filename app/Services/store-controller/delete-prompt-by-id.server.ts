import { ActionFunctionArgs } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";

export const deletePromptById = async (args: ActionFunctionArgs) => {
  const cloneRequest = args.request.clone();
  const { id } = (await cloneRequest.json()) as {
    id: number | string;
  };
  const fetcher = await loadFetcher(args, "delete");
  return await fetcher(`/prompt/${id}`, {
    body: JSON.stringify({ id }),
  });
};
