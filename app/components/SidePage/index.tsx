import { Link } from "@remix-run/react";
import Box from "../Box";
import { SubMenu } from "./SubMenu";
import { adminPageSideStyle } from "./styles.css";

const AdminPageMenus = [
  {
    id: 0,
    title: "스페이스 통계",
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
    children: [{ id: 0, title: "유저 목록", href: "/user/list" }],
  },
  {
    id: 3,
    title: "스토어 관리",
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

export default function AdminPageSide() {
  return (
    <Box className={adminPageSideStyle.asideWrap}>
      <Link to="/" className={adminPageSideStyle.menuLink}>
        <span className={adminPageSideStyle.menuTitle}>대시보드</span>
      </Link>
      {AdminPageMenus.map((item) => {
        return <SubMenu item={item} key={item.id} />;
      })}
    </Box>
  );
}
