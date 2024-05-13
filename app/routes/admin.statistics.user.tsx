import AdminPageSide from "~/admin/components/AdminPageSide/AdminPageSide";
import SpaceStatistics from "~/admin/components/Statistics/SpaceStatistics";
import AdminManagementLayout from "~/admin/layout/AdminManagementLayout/AdminManagementLayout";

export default function AdminStatisticsUser() {
  return (
    <AdminManagementLayout side={<AdminPageSide />}>
      <SpaceStatistics />
    </AdminManagementLayout>
  );
}
