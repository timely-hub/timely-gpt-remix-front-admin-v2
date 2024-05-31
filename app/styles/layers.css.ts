import { globalStyle, layer } from "@vanilla-extract/css";
import { getTextStyles } from "./helpers";
import { vars } from "./vars.css";

export const reset = layer("reset");
export const global = layer("global");
export const app = layer("app");
export const sprinkles = layer("sprinkles");

globalStyle("html, body", {
  "@layer": {
    [global]: {
      ...getTextStyles("Grayscale/Gray 500", "Body/16px/16px.400"),
    },
  },
});

globalStyle(`::-webkit-scrollbar`, {
  width: "12px",
  height: "12px",
});
globalStyle(`::-webkit-scrollbar-thumb`, {
  backgroundColor: vars.colors["Grayscale/Gray 200"],
  borderRadius: "100px",
  border: `4px solid transparent`,
  backgroundClip: "padding-box",
  cursor: "default",
  transition: "0.3s",
});

globalStyle(`::-webkit-scrollbar-thumb:hover`, {
  backgroundColor: vars.colors["Grayscale/Gray 300"],
});
globalStyle(`::-webkit-scrollbar-thumb:active`, {
  backgroundColor: vars.colors["Grayscale/Gray 200"],
});
globalStyle(`::-webkit-scrollbar-track`, {
  backgroundColor: "transparent",
  borderRadius: "100px",
});
