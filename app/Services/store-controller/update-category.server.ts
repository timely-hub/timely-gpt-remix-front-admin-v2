import { ActionFunctionArgs, json } from "@remix-run/node";
import { loadFetcher } from "~/utils/fetcher";

export const updateCategory =
  (args: ActionFunctionArgs) => async (id: string | number) => {
    const clonedRequest = args.request.clone();
    let categoryData = await clonedRequest.json();

    const url = id === "0" ? "/category" : `/category/${id}`;
    if (id === "0") {
      categoryData = { ...categoryData, displayOrder: 1 };
    }
    const fetcher = await loadFetcher(args, categoryData.method.toLowerCase());
    const response = await fetcher<string>(url, {
      method: categoryData.method,
      body: JSON.stringify(categoryData),
    });
    return json(response);
  };
