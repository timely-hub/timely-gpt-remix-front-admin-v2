import { keyframes } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

const slide = keyframes({
  from: {
    transform: "translateX(-100%)",
  },
  to: {
    transform: "translateX(0)",
  },
});

const slideDown = keyframes({
  from: {
    transform: "translateY(-100%)",
  },
  to: {
    transform: "translateY(0)",
  },
});

export const adminManagementLayoutStyles = appStyles({
  wrap: {
    display: "block",
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
    minHeight: calc.subtract("100vh", `${vars.navHeight}px`),
  },
  container: {
    maxWidth: "1920px",
    margin: "0 auto",
    display: "flex",
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
  },
  header: {
    maxWidth: "1920px",
    margin: "0 auto",
    width: "100%",
    height: "64px",
    backgroundColor: vars.colors["Grayscale/White"],
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    display: "flex",
    alignItems: "center",
    ...vars.typography["Title/24px/24px.700"],
    padding: "0 24px",
  },
  aside: {
    flexShrink: 0,
    flex: "1",
    position: "sticky",
    top: 0,
    height: "100%",
    minHeight: "100vh",
    minWidth: "280px",
    maxWidth: "280px",
    borderRight: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    backgroundColor: vars.colors["Grayscale/Gray 50"],
  },
  endSide: {
    flexShrink: 0,
    flex: "1",
    position: "sticky",
    top: 0,
    height: "100%",
    minHeight: "100vh",
    minWidth: "316px",
    maxWidth: "316px",
    borderLeft: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    backgroundColor: vars.colors["Grayscale/White"],
  },
  main: {
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
  },
  headerTitle: {
    ...getTextStyles("Grayscale/Gray 500", "Title/18px/18px.400"),
  },
});

export const adminPageSideStyle = appStyles({
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "0",
    width: "100%",
    position: "relative",
  },
  menu: {
    animation: `${slide} 0.3s`,
  },
  menuLink: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 8px",
    cursor: "pointer",
    textDecoration: "none",
  },
  rightMenuLink: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 16px",
    textDecoration: "none",
  },
  submenuWrap: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 8px",
    cursor: "pointer",
    textDecoration: "none",
  },
  menuDropdown: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px 8px",
    border: "none",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    width: "100%",
  },
  menuTitle: {
    ...vars.typography["Title/18px/18px.700"],
    color: vars.colors["Grayscale/Black"],
    borderLeft: "0px solid transparent",
    transition: "0.15s",
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
  },
  selected: {
    color: vars.colors["Primary/Primary 500"],
    ...vars.typography["Title/18px/18px.700"],
  },
  submenuTitle: {
    color: vars.colors["Grayscale/Gray 500"],
    ...vars.typography["Body/16px/16px.400"],
  },
  subMenuSelected: {
    color: vars.colors["Primary/Primary 500"],
  },
  arrowBox: {
    display: "flex",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderRadius: "4px",
  },
  asideWrap: {
    padding: "32px 16px",
  },
  dropdownWrap: {
    flexDirection: "column",
  },
  hidden: {
    display: "none",
  },
  rightSideWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "32px 16px",
  },
});
