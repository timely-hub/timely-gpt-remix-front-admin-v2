import { LoaderFunctionArgs } from "@remix-run/node";
import { createSpace } from "~/Services/space-controller/space-create.server";

export const action = async (args: LoaderFunctionArgs) => {
  const cloneRequest = args.request.clone();
  const data = await cloneRequest.json();
  return await createSpace(args)(data);
};
