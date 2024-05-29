import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import getDashboard from "~/Services/dashboard-controller/get-dashboard.server";
import Dashboard from "~/components/Dashboard/index";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const response = await getDashboard(args);
  return response;
};

export default function AdminIndex() {
  return <Dashboard />;
}
