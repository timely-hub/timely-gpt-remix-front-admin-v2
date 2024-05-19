import Dashboard from "~/components/Dashboard/index";
import AdminPageSide from "~/components/SidePage/index";
import AdminManagementLayout from "~/layouts/Sidebar/index";

export default function AdminDashboard() {
  return (
    <AdminManagementLayout side={<AdminPageSide />}>
      <Dashboard />
    </AdminManagementLayout>
  );
}
