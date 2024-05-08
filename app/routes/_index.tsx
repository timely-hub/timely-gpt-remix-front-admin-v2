import type { MetaFunction } from "@remix-run/node";
import AdminPageSide from "~/admin/components/AdminPageSide/AdminPageSide";
import Dashboard from "~/admin/components/Dashboard/Dashboard";
import AdminManagementLayout from "~/admin/layout/AdminManagementLayout/AdminManagementLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function AdminIndex() {
  return (
    <AdminManagementLayout side={<AdminPageSide />}>
      <Dashboard />
    </AdminManagementLayout>
  );
}
