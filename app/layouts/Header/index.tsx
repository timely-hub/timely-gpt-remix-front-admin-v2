import Box from "~/components/Box";
import { headerStyles } from "./styles.css";

export interface HeaderLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: HeaderLayoutProps) {
  return (
    <Box className={headerStyles.wrap}>
      <Box className={headerStyles.header}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
        >
          <Box>타임리 관리자 로그인</Box>
        </Box>
      </Box>
      <Box className={headerStyles.container}>
        <Box className={headerStyles.main}>{children}</Box>
      </Box>
    </Box>
  );
}
