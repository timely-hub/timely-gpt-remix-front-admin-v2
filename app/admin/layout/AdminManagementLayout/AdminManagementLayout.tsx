import { typoStyles } from "~/admin/styles/global.css";
import { Div, Flex } from "~/admin/templates/Box/Box";
import adminManagementLayoutStyles from "./AdminManagementLayout.css";

interface AdminManagementLayoutProps {
  children: React.ReactNode;
  side: React.ReactNode;
}

export default function AdminManagementLayout({
  children,
  side,
}: AdminManagementLayoutProps) {
  const styles = adminManagementLayoutStyles;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <Flex
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
        >
          <Div>대시보드</Div>
          <Div
            className={typoStyles["Title/18px/18px.400"]}
            color={"Grayscale_Gray500"}
          >
            타임리 GPT 관리
          </Div>
        </Flex>
      </div>
      <div className={styles.container}>
        <div className={styles.aside}>{side}</div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
