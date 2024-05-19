import Box from "~/components/Box";
import { adminManagementLayoutStyles } from "./styles.css";

interface AdminManagementLayoutProps {
  children: React.ReactNode;
  side: React.ReactNode;
}

export default function AdminManagementLayout({
  children,
  side,
}: AdminManagementLayoutProps) {
  return (
    <Box className={adminManagementLayoutStyles.wrap}>
      <Box className={adminManagementLayoutStyles.header}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
        >
          <Box>대시보드</Box>
          <Box className={adminManagementLayoutStyles.headerTitle}>
            타임리 GPT 관리
          </Box>
        </Box>
      </Box>
      <Box className={adminManagementLayoutStyles.container}>
        <Box className={adminManagementLayoutStyles.aside}>{side}</Box>
        <Box className={adminManagementLayoutStyles.main}>{children}</Box>
        <Box className={adminManagementLayoutStyles.endSide}></Box>
      </Box>
    </Box>
  );
}
