import { keyframes } from "@vanilla-extract/css";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

const load = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const loaderStyles = appStyles({
  loaderBg: {
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: vars.colors["Grayscale/Gray 500"],
    zIndex: "9999",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "50%",
    width: "10em",
    height: "10em",
    margin: "60px auto",
    fontSize: "10px",
    textIndent: "-9999em",
    borderTop: `1.1em solid ${vars.colors["Primary/Primary 200"]}`,
    borderRight: `1.1em solid ${vars.colors["Primary/Primary 200"]}`,
    borderBottom: `1.1em solid ${vars.colors["Primary/Primary 200"]}`,
    borderLeft: "1.1em solid #EFEFEF",
    WebkitTransform: "translateZ(0)",
    msTransform: "translateZ(0)",
    transform: "translateZ(0)",
    WebkitAnimation: `${load} 1.1s infinite linear`,
    animation: `${load} 1.1s infinite linear`,
    "::after": {
      borderRadius: "50%",
      width: "10em",
      height: "10em",
    },
  },
});
