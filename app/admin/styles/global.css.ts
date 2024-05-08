import {
  createGlobalTheme,
  globalLayer,
  globalStyle,
  style,
} from "@vanilla-extract/css";
import { objectKeys } from "~/utils/helpers";
import { figmaColors, figmaTheme, figmaTypography } from "./figmaStyles.css";

const root = createGlobalTheme("html body", {
  admin: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  fontSizes: {
    small: "12px",
    medium: "14px",
    large: "24px",
  },
});

export const defaultTheme = figmaTheme;

const typography = figmaTypography;

export const vars = { ...root, colors: figmaColors, typography };

export interface TypoProps {
  typo?: TypoStylesKey;
}

export const typoStyles = objectKeys(typography).reduce((acc, key) => {
  acc[key] = style(typography[key]);
  return acc;
}, {} as Record<keyof typeof typography, string>);
export type TypoStylesKey = keyof typeof typography;

export const navHeight = 60;
export const breakpoints = {
  tiny: 480,
  mobile: 768,
  tablet: 1024,
  desktop: 1472,
};
export const mediaQuery = {
  max: {
    tiny: `(max-width: ${breakpoints.tiny - 1}px)`,
    mobile: `(max-width: ${breakpoints.mobile - 1}px)`,
    tablet: `(max-width: ${breakpoints.tablet - 1}px)`,
    desktop: `(max-width: ${breakpoints.desktop - 1}px)`,
  },
  min: {
    tiny: `(min-width: ${breakpoints.tiny}px)`,
    mobile: `(min-width: ${breakpoints.mobile}px)`,
    tablet: `(min-width: ${breakpoints.tablet}px)`,
    desktop: `(min-width: ${breakpoints.desktop}px)`,
  },
};

globalStyle('#container[aria-hidden="true"]', {
  filter: "blur(4px)",
  pointerEvents: "none",
});
globalStyle("html body", {
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  minHeight: "100svh",
});
globalLayer({ parent: "core" }, "preflight");
globalLayer("default");
globalLayer("vanilla");
globalLayer("sprinkles");
