import { ComplexStyleRule, keyframes } from "@vanilla-extract/css";
import { getTextStyles } from "~/styles/helpers";
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
  tdSmall: layerStyle({
    padding: "1px 4px",
    ...vars.typography["Body/12px/12px.400"],
    borderRadius: "4px",
  }),
  small: layerStyle({
    padding: "8px 16px",
    ...vars.typography["Body/14px/14px.500"],
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
  primaryGhostFilled: {
    backgroundColor: vars.colors["Primary/Primary 50"],
    border: "none",
    borderRadius: "8px",
    outline: "none",
    color: vars.colors["Primary/Primary 500"],
    ":hover": {
      backgroundColor: vars.colors["Primary/Primary 100"],
    },
    ":active": {
      backgroundColor: vars.colors["Primary/Primary 50"],
    },
    ":disabled": {
      backgroundColor: vars.colors["Grayscale/Gray 50"],
      color: vars.colors["Primary/Primary 200"],
    },
  },
  grayscaleFilled: {
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    border: "none",
    borderRadius: "8px",
    outline: "none",
    color: vars.colors["Grayscale/Black"],
    ":hover": {
      backgroundColor: vars.colors["Grayscale/Gray 100"],
    },
    ":active": {
      backgroundColor: vars.colors["Grayscale/Gray 200"],
      color: vars.colors["Grayscale/White"],
    },
    ":disabled": {
      backgroundColor: vars.colors["Grayscale/Gray 200"],
      color: vars.colors["Grayscale/White"],
    },
  },
  dangerGhostFilled: {
    backgroundColor: vars.colors["Red/Red 50"],
    border: "none",
    borderRadius: "8px",
    outline: "none",
    color: vars.colors["Red/Red 500"],
    ":hover": {
      backgroundColor: vars.colors["Red/Red 100"],
    },
    ":active": {
      backgroundColor: vars.colors["Red/Red 50"],
      color: vars.colors["Red/Red 200"],
    },
    ":disabled": {
      backgroundColor: vars.colors["Red/Red 50"],
      color: vars.colors["Red/Red 200"],
    },
  },
} as const;

const spanColors = {
  default: {
    ...getTextStyles("Grayscale/Black", "Body/14px/14px.400"),
  },
  greenFilled: {
    backgroundColor: vars.colors["Green/Green 100"],
    borderRadius: "100px",
    padding: "2px 8px",
    ...getTextStyles("Grayscale/Gray 500", "Body/12px/12px.500"),
  },
  yellowFilled: {
    backgroundColor: vars.colors["Yellow/Yellow 100"],
    borderRadius: "100px",
    padding: "2px 8px",
    ...getTextStyles("Yellow/Yellow 500", "Body/12px/12px.500"),
  },
  primaryFilled: {
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderRadius: "100px",
    padding: "2px 8px",
    ...getTextStyles("Primary/Primary 500", "Body/12px/12px.500"),
  },
  grayScaleFilled: {
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderRadius: "100px",
    padding: "2px 8px",
    ...getTextStyles("Grayscale/Gray 500", "Body/12px/12px.500"),
  },
};

const buttonsStyles = {
  primaryFilled: layerStyle({
    ...buttonColors.primaryFilled,
  }),
  primaryGhostFilled: layerStyle({
    ...buttonColors.primaryGhostFilled,
  }),
  grayscaleFilled: layerStyle({
    ...buttonColors.grayscaleFilled,
  }),
  dangerGhostFilled: layerStyle({
    ...buttonColors.dangerGhostFilled,
  }),
};

export const spanStyles = {
  default: layerStyle({
    ...spanColors.default,
  }),
  greenFilled: layerStyle({
    ...spanColors.greenFilled,
  }),
  yellowFilled: layerStyle({
    ...spanColors.yellowFilled,
  }),
  primaryFilled: layerStyle({
    ...spanColors.primaryFilled,
  }),
  grayScaleFilled: layerStyle({
    ...spanColors.grayScaleFilled,
  }),
};

export default buttonsStyles;
