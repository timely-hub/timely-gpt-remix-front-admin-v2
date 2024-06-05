import { keyframes } from "@vanilla-extract/css";
import { layerStyle } from "~/styles/layer.css";

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const buttonLoadingStyle = layerStyle({
  display: "flex",
  width: "24px",
  height: "24px",
  alignItems: "center",
  justifyContent: "center",
  animation: `${rotate} 1s linear infinite`,
});
