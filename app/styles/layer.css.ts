import { ComplexStyleRule, style, StyleRule } from "@vanilla-extract/css";
import { objectKeys } from "~/utils/typeHelpers";

type ClassNames = string | Array<ClassNames>;

/**
 * css layer계층을 한번 감싸주는 함수, 기본값은 vanilla레이어, tailwindcss와 sprinkle을 사용할 때, 우선순위 충돌을 방지하기 위해 사용
 * @param rule
 * @param layerName
 * @param debugId
 * @returns
 */
export const layerStyle = (
  rule: ComplexStyleRule,
  layerName = "app",
  debugId?: string
) => {
  if (Array.isArray(rule)) {
    return style(
      rule.map((r: StyleRule | ClassNames) => {
        if (typeof r === "string" || Array.isArray(r)) {
          return r;
        } else {
          return {
            "@layer": {
              [layerName]: r,
            },
          };
        }
      }),
      debugId
    );
  } else {
    return style(
      {
        "@layer": {
          [layerName]: rule,
        },
      },
      debugId
    );
  }
};

export const appStyles = <T extends { [key in string]: ComplexStyleRule }>(
  rules: T
) => {
  return objectKeys(rules).reduce((acc, key) => {
    return {
      ...acc,
      [key]: layerStyle(rules[key], "app", key as string),
    };
  }, {} as { [key in keyof T]: string });
};

export const sprinkleStyle = (...rules: (StyleRule | ClassNames)[]) =>
  layerStyle(rules, "sprinkles");
