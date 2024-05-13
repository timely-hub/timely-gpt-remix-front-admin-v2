import AdminPageSide from "~/admin/components/AdminPageSide/AdminPageSide";
import Dashboard from "~/admin/components/Dashboard/Dashboard";
import AdminManagementLayout from "~/admin/layout/AdminManagementLayout/AdminManagementLayout";

export default function AdminDashboard() {
  return (
    <AdminManagementLayout side={<AdminPageSide />}>
      <Dashboard />
    </AdminManagementLayout>
  );
}
