import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getPromptInfo } from "~/Services/space-controller/get-prompt-info-by-id.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const response = await getPromptInfo(args)(Number(id) || 0);
  return json({ response: response.data });
};
