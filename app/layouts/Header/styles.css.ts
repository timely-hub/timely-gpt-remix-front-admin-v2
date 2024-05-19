import { calc } from "@vanilla-extract/css-utils";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const headerStyles = appStyles({
  wrap: {
    display: "block",
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
    minHeight: calc.subtract("100vh", `${vars.navHeight}px`),
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
  container: {
    maxWidth: "1920px",
    margin: "0 auto",
    display: "flex",
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
  },
  main: {
    width: "100%",
    backgroundColor: vars.colors["Grayscale/White"],
  },
});
