import { ActionFunctionArgs, json } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";

export const updateCategory =
  (args: ActionFunctionArgs) => async (id: string | number) => {
    const clonedRequest = args.request.clone();
    const categoryData = await clonedRequest.json();
    const fetcher = await loadFetcher(args, "put");
    const response = await fetcher<string>(`/category/${id}`, {
      body: JSON.stringify(categoryData),
    });
    return json(response);
  };
