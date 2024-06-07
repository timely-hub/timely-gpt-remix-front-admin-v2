import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getPromptInfo } from "~/Services/space-controller/get-prompt-info-by-id.server";
import PromptPackageEditComponent from "~/components/Store/Package/Edit";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;
  const url = new URL(args.request.url);
  const label = url.searchParams.get("label");
  const response = await getPromptInfo(args)(id || "");
  return json({ id, label, response: response?.data });
};

export default function PromptPackageEditPage() {
  return <PromptPackageEditComponent />;
}
