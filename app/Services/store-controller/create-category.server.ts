import { ActionFunctionArgs, json } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";

export const createCategory = (args: ActionFunctionArgs) => async () => {
  const cloneRequest = args.request.clone();
  const categoryData = await cloneRequest.json();
  const fetcher = await loadFetcher(args, "post");
  const response = await fetcher<string>("/category", {
    method: categoryData.method,
    body: JSON.stringify({
      displayOrder: categoryData.displayOrder,
      label: categoryData.label,
      description: categoryData.description,
    }),
  });
  return json(response);
};
