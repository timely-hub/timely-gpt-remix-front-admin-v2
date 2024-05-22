import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import ArrowDown from "~/assets/icons/ArrowDown.svg?react";
import ArrowRight from "~/assets/icons/ArrowRight.svg?react";
import Box from "~/components/Box";
import { adminPageSideStyle } from "../styles.css";

export type MenuProps = {
  id: number;
  title: string;
  name: string;
  children?: {
    id: number;
    title: string;
    href: string;
  }[];
};

export const SubMenu = ({ item }: { item: MenuProps }) => {
  const pathname = useLocation().pathname;
  const mainPath = pathname.split("/")[1];
  const [selected, setSelected] = useState<string>();
  const [subNav, setSubNav] = useState(false);
  const showSubNav = () => setSubNav(!subNav);

  useMemo(() => {
    setSelected(mainPath);
  }, [mainPath]);

  return (
    <>
      <Box>
        <Box
          display={"flex"}
          onClick={item.children && showSubNav}
          className={adminPageSideStyle.submenuWrap}
        >
          <span
            className={clsx(
              adminPageSideStyle.menuTitle,
              selected === item.name ? adminPageSideStyle.selected : null
            )}
          >
            {item.title}
          </span>
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
              <Box
                className={adminPageSideStyle.menu}
                display={"flex"}
                flexDirection={"column"}
                key={item.id}
              >
                <Link className={adminPageSideStyle.menuLink} to={item.href}>
                  <span
                    className={clsx(
                      adminPageSideStyle.submenuTitle,
                      pathname === item.href
                        ? adminPageSideStyle.subMenuSelected
                        : null
                    )}
                  >
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
