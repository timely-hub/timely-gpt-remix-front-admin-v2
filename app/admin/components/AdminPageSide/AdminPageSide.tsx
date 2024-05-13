import { Link } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import SvgArrowDown from "~/admin/assets/icons/ArrowDown";
import { Flex } from "~/admin/templates/Box/Box";
import adminPageSideStyle from "./AdminPageSide.css";

const AdminPageMenus = [
  {
    title: "대시보드",
    href: "/admin/dashboard",
  },
  {
    title: "스페이스 통계",
    href: "#",
    children: [
      {
        title: "스페이스",
        href: "/admin/statistics/space",
      },
      {
        title: "유저",
        href: "/admin/statistics/user",
      },
      {
        title: "스토어",
        href: "/admin/statistics/store",
      },
    ],
  },
  {
    title: "스페이스 관리",
    href: "#",
    children: [
      {
        title: "스페이스 생성",
        href: "/admin/space/create",
      },
      {
        title: "스페이스 목록",
        href: "/admin/space/list",
      },
    ],
  },
  {
    title: "유저 관리",
    href: "#",
    children: [{ title: "유저 목록", href: "/admin/user/list" }],
  },
  {
    title: "스토어 관리",
    href: "#",
    children: [
      {
        title: "카테고리 관리",
        href: "/admin/store/category",
      },
      {
        title: "프롬프트 관리",
        href: "/admin/store/prompt",
      },
      {
        title: "프롬프트 꾸러미 생성",
        href: "/admin/store/prompt-package/create",
      },
    ],
  },
];

export default function AdminPageSide() {
  const [selectedMenu, setSelectedMenu] = useState<null | number>(null);

  const handleMenuClick = (index: number) => {
    setSelectedMenu((prev) => (prev === index ? null : index));
  };
  const styles = adminPageSideStyle;
  return (
    <div className={styles.asideWrap}>
      {AdminPageMenus.map((menu, index) => (
        <div key={index}>
          <Link
            className={styles.menuLink}
            to={menu.href}
            onClick={() => handleMenuClick(index)}
          >
            <span className={clsx(styles.menuTitle)}>
              {menu.title}
              {menu.children && (
                <span className={styles.arrowBox}>
                  <SvgArrowDown />
                </span>
              )}
            </span>
          </Link>
          {selectedMenu === index && menu.children && (
            <Flex flexDirection={"column"}>
              {menu.children.map((child, childIndex) => (
                <Link
                  className={styles.menuLink}
                  key={childIndex}
                  to={child.href}
                >
                  <span className={styles.submenuTitle}>{child.title}</span>
                </Link>
              ))}
            </Flex>
          )}
        </div>
      ))}
    </div>
  );
}
