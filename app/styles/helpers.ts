import clsx, { ClassValue } from "clsx";
import { figmaColors, figmaTypography, vars } from "./vars.css";

export const css = <T extends { [key: string]: string }, K extends keyof T>(
  obj: T,
  target: K,
  ...inputs: (K | ClassValue)[]
) => {
  let classValue: ClassValue[] = [];
  let vanillaValue: K[] = [];
  inputs.forEach((input) => {
    if (typeof input === "string" && input in obj) {
      if (input === target) return;
      vanillaValue = [...vanillaValue, input as K];
    } else {
      classValue = [...classValue, input as ClassValue[]];
    }
  });
  return {
    className: clsx(
      obj[target],
      ...vanillaValue.map((key) => obj[key as string]),
      classValue
    ),
  };
};

export const extractClassNames = <T extends { [key: string]: string }>(
  obj: T
) => {
  return function (target: keyof T, ...inputs: ClassValue[]) {
    return css(obj, target, ...inputs);
  };
};

export const getColor = (color: keyof typeof figmaColors) => figmaColors[color];

export const getFontStyle = (
  typography: keyof typeof figmaTypography
): {
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
} => figmaTypography[typography];

export const getInsetBorder = (
  size: number = 1,
  color: keyof typeof figmaColors,
  radius?: number
) => ({
  boxShadow: `inset 0 0 0 ${size}px ${vars.colors[color]}`,
  ...(radius && { borderRadius: `${radius}px` }),
});
export const getBorder = (
  size: number,
  color: keyof typeof figmaColors,
  radius?: number
) => ({
  border: `${size}px solid ${vars.colors[color]}`,
  ...(radius && { borderRadius: `${radius}px` }),
});

export const getBgColor = (color: keyof typeof figmaColors) => ({
  backgroundColor: getColor(color),
});
export const getFontColor = (color: keyof typeof figmaColors) => ({
  color: getColor(color),
});
export const getTextStyles = (
  color: keyof typeof figmaColors,
  typography: keyof typeof figmaTypography
) => ({
  color: getColor(color),
  ...getFontStyle(typography),
});
