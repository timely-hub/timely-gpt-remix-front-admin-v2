import {
  assignVars,
  createTheme,
  createThemeContract,
  globalStyle,
  style,
} from "@vanilla-extract/css";
import { objectKeys } from "~/utils/typeHelpers";
export const figmaTypography = {
  "Title/40px/40px.700": {
    fontSize: "40px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "52px",
  },
  "Title/40px/40px.400": {
    fontSize: "40px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "52px",
  },
  "Title/32px/32px.700": {
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "42px",
  },
  "Title/32px/32px.400": {
    fontSize: "32px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "42px",
  },
  "Title/24px/24px.700": {
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "34px",
  },
  "Title/24px/24px.400": {
    fontSize: "24px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "34px",
  },
  "Title/18px/18px.700": {
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "26px",
  },
  "Title/18px/18px.400": {
    fontSize: "18px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "26px",
  },
  "Body/16px/16px.400": {
    fontSize: "16px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "24px",
  },
  "Body/16px/16px.500": {
    fontSize: "16px",
    fontWeight: "500",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "24px",
  },
  "Body/16px/16px.700": {
    fontSize: "16px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "24px",
  },
  "Body/14px/14px.400": {
    fontSize: "14px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "20px",
  },
  "Body/14px/14px.500": {
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "20px",
  },
  "Body/14px/14px.700": {
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "20px",
  },
  "Body/12px/12px.400": {
    fontSize: "12px",
    fontWeight: "400",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "16px",
  },
  "Body/12px/12px.500": {
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "16px",
  },
  "Body/12px/12px.700": {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "-0.4000000059604645px",
    lineHeight: "16px",
  },
};

export const figmaColors = createThemeContract({
  "Grayscale/White": null,
  "Grayscale/Gray 50": null,
  "Grayscale/Gray 100": null,
  "Grayscale/Gray 200": null,
  "Grayscale/Gray 300": null,
  "Grayscale/Gray 400": null,
  "Grayscale/Gray 500": null,
  "Grayscale/Gray 600": null,
  "Grayscale/Black": null,
  "Primary/Primary 50": null,
  "Primary/Primary 100": null,
  "Primary/Primary 200": null,
  "Primary/Primary 500": null,
  "Primary/Primary 600": null,
  "Primary/Primary 700": null,
  "Red/Red 50": null,
  "Red/Red 100": null,
  "Red/Red 200": null,
  "Red/Red 500": null,
  "Red/Red 600": null,
  "Red/Red 700": null,
  "Green/Green 50": null,
  "Green/Green 100": null,
  "Green/Green 200": null,
  "Green/Green 500": null,
  "Green/Green 600": null,
  "Green/Green 700": null,
  "Yellow/Yellow 50": null,
  "Yellow/Yellow 100": null,
  "Yellow/Yellow 200": null,
  "Yellow/Yellow 500": null,
  "Yellow/Yellow 600": null,
  "Yellow/Yellow 700": null,
  "Blue/Blue 50": null,
  "Blue/Blue 100": null,
  "Blue/Blue 200": null,
  "Blue/Blue 500": null,
});

export const figmaShadows = {
  ShadowXs: "0px 1px 2px 0px #33333333",
  ShadowSm: "0px 1px 2px 0px #33333333, 0px 3px 3px 0px #33333333",
  ShadowMd: "0px 2px 4px -2px #33333333, 0px 6px 8px -2px #33333333",
  ShadowLg: "0px 4px 6px -2px #33333333, 0px 12px 16px -4px #33333333",
  ShadowXl: "0px 8px 8px -4px #33333333, 0px 20px 24px -4px #33333333",
};
export const figmaTheme = createTheme(figmaColors, {
  "Grayscale/White": "#ffffff",
  "Grayscale/Gray 50": "#f7f8f9",
  "Grayscale/Gray 100": "#e8ebed",
  "Grayscale/Gray 200": "#c9cdd2",
  "Grayscale/Gray 300": "#9ea4aa",
  "Grayscale/Gray 400": "#72787f",
  "Grayscale/Gray 500": "#4d5053",
  "Grayscale/Gray 600": "#3d4043",
  "Grayscale/Black": "#1b1d1f",
  "Primary/Primary 50": "#f8f5ff",
  "Primary/Primary 100": "#e2d6ff",
  "Primary/Primary 200": "#c8acff",
  "Primary/Primary 500": "#894fff",
  "Primary/Primary 600": "#6d35de",
  "Primary/Primary 700": "#5221b5",
  "Red/Red 50": "#fef3f2",
  "Red/Red 100": "#ffeaea",
  "Red/Red 200": "#ffdddd",
  "Red/Red 500": "#e02d3c",
  "Red/Red 600": "#b91c1c",
  "Red/Red 700": "#981b25",
  "Green/Green 50": "#f5fbf8",
  "Green/Green 100": "#e9fdf0",
  "Green/Green 200": "#b1f3c8",
  "Green/Green 500": "#08875d",
  "Green/Green 600": "#04724d",
  "Green/Green 700": "#066042",
  "Yellow/Yellow 50": "#fffaeb",
  "Yellow/Yellow 100": "#fff5d7",
  "Yellow/Yellow 200": "#fedf89",
  "Yellow/Yellow 500": "#b25e09",
  "Yellow/Yellow 600": "#96530f",
  "Yellow/Yellow 700": "#80460d",
  "Blue/Blue 50": "#f7faff",
  "Blue/Blue 100": "#edf3ff",
  "Blue/Blue 200": "#b8cfff",
  "Blue/Blue 500": "#2f6fed",
});
const styleConfigs = createThemeContract({
  navHeight: "52px",
  wrapperWidth: "100%",
  wrapperPadding: "16px",
});

export const vars = {
  ...styleConfigs,
  shadows: figmaShadows,
  colors: figmaColors,
  typography: figmaTypography,
};

export type FontStylesKey = keyof typeof figmaTypography;

export const fontStyles = objectKeys(figmaTypography).reduce((acc, key) => {
  acc[key] = style({
    "@layer": {
      sprinkles: figmaTypography[key],
    },
  });
  return acc;
}, {} as Record<keyof typeof figmaTypography, string>);

globalStyle(`:root`, {
  vars: assignVars(styleConfigs, {
    navHeight: "52px",
    wrapperWidth: "100%",
    wrapperPadding: "16px",
  }),
});
