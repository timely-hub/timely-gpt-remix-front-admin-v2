import { calc } from "@vanilla-extract/css-utils";
import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

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
    borderRight: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    backgroundColor: vars.colors["Grayscale/White"],
  },
  main: {
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
  },
  headerTitle: {
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
  },
});
