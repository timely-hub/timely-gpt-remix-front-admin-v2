import { globalStyle } from "@vanilla-extract/css";
import { getFontColor, getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const textInputStyles = appStyles({
  wrap: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    gap: "8px",
    boxShadow: `inset 0 0 0 1px ${vars.colors["Grayscale/Gray 100"]}`,
    backgroundColor: vars.colors["Grayscale/White"],
    transition: "0.15s",
    borderRadius: "8px",
  },
  input: {
    transition: "0.15s",
    flex: "1",
    height: "auto",
    padding: "0",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    resize: "none",
    minWidth: "0px",
    maxWidth: "auto",
    ...getTextStyles("Grayscale/Black", "Body/14px/14px.400"),
    "&::placeholder": {
      ...getFontColor("Grayscale/Gray 300"),
    },
    "&:disabled": {
      ...getFontColor("Grayscale/Gray 300"),
    },
  },
});

globalStyle(`${textInputStyles.wrap}.focus`, {
  boxShadow: `inset 0 0 0 1px ${vars.colors["Primary/Primary 500"]}`,
});
globalStyle(`${textInputStyles.wrap}.error`, {
  boxShadow: `inset 0 0 0 1px ${vars.colors["Red/Red 500"]}`,
});
globalStyle(`${textInputStyles.wrap}.disabled`, {
  backgroundColor: vars.colors["Grayscale/Gray 50"],
  boxShadow: `inset 0 0 0 1px ${vars.colors["Grayscale/Gray 100"]}`,
});
