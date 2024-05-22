import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import Box from "~/components/Box";
import { SubMenu } from "./SubMenu";
import { adminManagementLayoutStyles, adminPageSideStyle } from "./styles.css";

const AdminPageMenus = [
  {
    id: 0,
    title: "스페이스 통계",
    name: "statistics",
    children: [
      {
        id: 0,
        title: "스페이스",
        href: "/statistics/space",
      },
      {
        id: 1,
        title: "유저",
        href: "/statistics/user",
      },
      {
        id: 2,
        title: "스토어",
        href: "/statistics/store",
      },
    ],
  },
  {
    id: 1,
    title: "스페이스 관리",
    name: "space",
    children: [
      {
        id: 0,
        title: "스페이스 생성",
        href: "/space/create",
      },
      {
        id: 1,
        title: "스페이스 목록",
        href: "/space/list",
      },
    ],
  },
  {
    id: 2,
    title: "유저 관리",
    name: "user",
    children: [{ id: 0, title: "유저 목록", href: "/user/list" }],
  },
  {
    id: 3,
    title: "스토어 관리",
    name: "store",
    children: [
      {
        id: 0,
        title: "카테고리 관리",
        href: "/store/category",
      },
      {
        id: 1,
        title: "프롬프트 관리",
        href: "/store/prompt",
      },
      {
        id: 2,
        title: "프롬프트 꾸러미 생성",
        href: "/store/prompt-package/create",
      },
    ],
  },
];

interface AdminManagementLayoutProps {
  children: React.ReactNode;
}

export default function AdminManagementLayout({
  children,
}: AdminManagementLayoutProps) {
  const pathname = useLocation().pathname;

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
        <Box className={adminManagementLayoutStyles.aside}>
          <Box className={adminPageSideStyle.asideWrap}>
            <Link to="/" className={adminPageSideStyle.menuLink}>
              <span
                className={clsx(
                  adminPageSideStyle.menuTitle,
                  pathname === "/" ? adminPageSideStyle.selected : null
                )}
              >
                대시보드
              </span>
            </Link>
            {AdminPageMenus.map((item) => {
              return <SubMenu item={item} key={item.id} />;
            })}
          </Box>
        </Box>
        <Box className={adminManagementLayoutStyles.main}>{children}</Box>
        {pathname !== "/" ? (
          <Box className={adminManagementLayoutStyles.endSide}></Box>
        ) : null}
      </Box>
    </Box>
  );
}
