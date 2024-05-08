import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { navHeight, vars } from "~/admin/styles/global.css";

const adminManagementLayoutStyles = {
  wrap: style({
    display: "block",
    width: "100%",
    backgroundColor: vars.colors.Grayscale_White,
    minHeight: calc.subtract("100vh", `${navHeight}px`),
  }),
  container: style({
    maxWidth: "1920px",
    margin: "0 auto",
    display: "flex",
    width: "100%",
    backgroundColor: vars.colors.Grayscale_White,
  }),
  header: style({
    maxWidth: "1920px",
    margin: "0 auto",
    width: "100%",
    height: "64px",
    backgroundColor: vars.colors.Grayscale_White,
    borderBottom: `1px solid ${vars.colors.Grayscale_Gray200}`,
    display: "flex",
    alignItems: "center",
    ...vars.typography["Title/24px/24px.700"],
  }),
  aside: style({
    flexShrink: 0,
    flex: "1",
    height: "100vh",
    minWidth: "280px",
    maxWidth: "280px",
    borderRight: `1px solid ${vars.colors.Grayscale_Gray200}`,
    backgroundColor: vars.colors.Grayscale_Gray50,
  }),
  main: style({
    width: "100%",
    backgroundColor: vars.colors.Grayscale_White,
  }),
};

export default adminManagementLayoutStyles;
