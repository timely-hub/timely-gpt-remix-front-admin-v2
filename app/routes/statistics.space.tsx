import AdminPageSide from "~/components/SidePage/index";
import SpaceStatistics from "~/components/Statistics/index";
import AdminManagementLayout from "~/layouts/Sidebar/index";

export default function AdminStatisticsSpace() {
  return (
    <AdminManagementLayout side={<AdminPageSide />}>
      <SpaceStatistics />
    </AdminManagementLayout>
  );
}
