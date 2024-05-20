import { Link } from "@remix-run/react";
import { useState } from "react";
import ArrowDown from "~/assets/icons/ArrowDown.svg?react";
import ArrowRight from "~/assets/icons/ArrowRight.svg?react";
import Box from "~/components/Box";
import { adminPageSideStyle } from "../styles.css";

export type MenuProps = {
  id: number;
  title: string;
  children?: {
    id: number;
    title: string;
    href: string;
  }[];
};

export const SubMenu = ({ item }: { item: MenuProps }) => {
  const [subNav, setSubNav] = useState(false);

  const showSubNav = () => setSubNav(!subNav);

  return (
    <>
      <Box>
        <Box
          display={"flex"}
          onClick={item.children && showSubNav}
          className={adminPageSideStyle.submenuWrap}
        >
          <span className={adminPageSideStyle.menuTitle}>{item.title}</span>
          <div>
            {item.children &&
              (subNav ? (
                <ArrowDown></ArrowDown>
              ) : item.children ? (
                <ArrowRight></ArrowRight>
              ) : null)}
          </div>
        </Box>
        {subNav &&
          item.children?.map((item) => {
            return (
              <Box display={"flex"} flexDirection={"column"} key={item.id}>
                <Link className={adminPageSideStyle.menuLink} to={item.href}>
                  <span className={adminPageSideStyle.submenuTitle}>
                    {item.title}
                  </span>
                </Link>
              </Box>
            );
          })}
      </Box>
    </>
  );
};
