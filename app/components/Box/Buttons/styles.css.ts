import { ComplexStyleRule, keyframes } from "@vanilla-extract/css";
import { layerStyle } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});
export const sizes = {
  small: layerStyle({
    padding: "8px 16px",
    ...vars.typography["Body/16px/16px.400"],
  }),
  large: layerStyle({
    padding: "9px 24px",
    ...vars.typography["Body/16px/16px.400"],
  }),
} as const;
export const buttonLoadingStyle = layerStyle({
  display: "flex",
  width: "24px",
  height: "24px",
  alignItems: "center",
  justifyContent: "center",
  animation: `${rotate} 1s linear infinite`,
});

const buttonDefaultCss: ComplexStyleRule = {
  borderRadius: "8px",
  cursor: "pointer",
  userSelect: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease-in-out",
};
export const buttonDefaultStyle = layerStyle({
  ...buttonDefaultCss,
});

const buttonColors = {
  primaryFilled: {
    backgroundColor: vars.colors["Primary/Primary 500"],
    border: "none",
    borderRadius: "8px",
    outline: "none",
    color: vars.colors["Grayscale/White"],
    ":hover": {
      backgroundColor: vars.colors["Primary/Primary 600"],
    },
    ":active": {
      backgroundColor: vars.colors["Primary/Primary 500"],
    },
    ":disabled": {
      backgroundColor: vars.colors["Grayscale/Gray 500"],
      color: vars.colors["Grayscale/White"],
    },
  },
} as const;

const buttonsStyles = {
  primaryFilled: layerStyle({
    ...buttonColors.primaryFilled,
  }),
};

export default buttonsStyles;
