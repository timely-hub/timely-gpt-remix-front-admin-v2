import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "~/styles/vars.css";

export const asterisk = style({
  color: vars.colors["Red/Red 500"],
  margin: "0 4px",
  fontSize: "18px",
  display: "inline-flex",
  alignItems: "center",
});
globalStyle(`${asterisk} > span`, {
  width: "8px",
  height: "8px",
});
