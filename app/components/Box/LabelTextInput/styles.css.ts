import { globalStyle, style } from "@vanilla-extract/css";
import { getTextStyles } from "~/styles/helpers";
import { layerStyle } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

const textInputStyle = {
  wrap: layerStyle({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    gap: "12px",
  }),
  input: layerStyle({
    flex: "1",
    height: "auto",
    padding: "0",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    resize: "none",
    minWidth: "0px",
    maxWidth: "auto",
    width: "100%",
    caretColor: vars.colors["Grayscale/Gray 300"],
    ...getTextStyles("Grayscale/Black", "Body/14px/14px.400"),
    "::placeholder": {
      color: vars.colors["Grayscale/Gray 300"],
    },
  }),
  button: style({
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    cursor: "pointer",
    selectors: {
      "&:focus": {
        outline: "none",
      },
    },
  }),
  errorBottom: style({
    position: "absolute",
    left: "0px",
    bottom: "0px",
    transform: "translateY(100%)",
    padding: "4px 16px",
    overflow: "hidden",
    width: "100%",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...getTextStyles("Red/Red 500", "Body/12px/12px.400"),
  }),
  labelWrap: layerStyle({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  }),
  inputLabel: style({
    color: vars.colors["Grayscale/Gray 300"],
    display: "flex",
    alignItems: "center",
    ...vars.typography["Body/12px/12px.400"],
  }),
};

globalStyle(`${textInputStyle.wrap}.line`, {
  borderBottom: `1px solid ${vars.colors["Grayscale/Gray 300"]}`,
});
globalStyle(`${textInputStyle.wrap}.default`, {
  border: `1px solid ${vars.colors["Grayscale/Gray 300"]}`,
  borderRadius: "8px",
  backgroundColor: vars.colors["Grayscale/White"],
});
globalStyle(`${textInputStyle.wrap}.focus`, {
  borderColor: `${vars.colors["Primary/Primary 200"]}`,
});
globalStyle(`${textInputStyle.wrap}.error`, {
  borderColor: `${vars.colors["Red/Red 500"]}`,
});
globalStyle(`${textInputStyle.wrap}.error-bottom`, {
  marginBottom: "20px",
});
globalStyle(`${textInputStyle.wrap}.error`, {
  position: "relative",
});
globalStyle(`${textInputStyle.wrap}.error input`, {
  color: `${vars.colors["Red/Red 500"]}`,
});
globalStyle(`${textInputStyle.wrap}.disabled`, {
  opacity: "0.5",
});
globalStyle(`${textInputStyle.button}:focus svg`, {
  opacity: "1 !important",
});
globalStyle(`${textInputStyle.button}:focus g`, {
  fill: `${vars.colors["Grayscale/Gray 300"]}`,
  opacity: "1",
});
globalStyle(`${textInputStyle.button}.hidden`, {
  display: "none",
});
export default textInputStyle;
