import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import ArrowDown from "~/assets/icons/ArrowDown.svg?react";
import ArrowRight from "~/assets/icons/ArrowRight.svg?react";
import Box from "../Box";
import SvgButton from "../SvgButton";
import { adminPageSideStyle } from "./styles.css";

const AdminPageMenus = [
  {
    title: "대시보드",
    href: "/admin/dashboard",
  },
  {
    title: "스페이스 통계",
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
    children: [{ title: "유저 목록", href: "/admin/user/list" }],
  },
  {
    title: "스토어 관리",
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
  const pathname = useLocation().pathname;
  console.log(pathname);
  const [selectedMenu, setSelectedMenu] = useState<null | number>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<number | null>(null);

  const handleMenuClick = (index: number) => {
    setSelectedMenu((prev) => (prev === index ? null : index));
  };

  const handleSubMenuClick = (index: number) => {
    setSelectedSubMenu(index);
  };
  return (
    <Box className={adminPageSideStyle.asideWrap}>
      {AdminPageMenus.map((menu, index) => (
        <Box key={index}>
          <Link
            className={adminPageSideStyle.menuLink}
            key={index}
            to={menu.href ? menu.href : ""}
            onClick={() => handleMenuClick(index)}
          >
            <span
              className={clsx(adminPageSideStyle.menuTitle, {
                [adminPageSideStyle.selected]: selectedMenu === index,
              })}
            >
              {menu.title}
              {menu.children && (
                <span className={adminPageSideStyle.arrowBox}>
                  {selectedMenu === index ? (
                    <SvgButton icon={ArrowDown} />
                  ) : (
                    <SvgButton icon={ArrowRight} />
                  )}
                </span>
              )}
            </span>
          </Link>
          {selectedMenu === index && menu.children && (
            <div className={adminPageSideStyle.dropdownWrap}>
              {menu.children.map((child, childIndex) => (
                <Link
                  className={adminPageSideStyle.menuLink}
                  key={childIndex}
                  to={child.href}
                  onClick={() => handleSubMenuClick(childIndex)}
                >
                  <span
                    className={clsx(adminPageSideStyle.submenuTitle, {
                      [adminPageSideStyle.subMenuSelected]:
                        selectedSubMenu === childIndex,
                    })}
                  >
                    {child.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Box>
      ))}
    </Box>
  );
}
