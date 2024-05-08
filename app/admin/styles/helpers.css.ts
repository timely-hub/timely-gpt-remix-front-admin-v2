import { ComplexStyleRule, StyleRule, style } from "@vanilla-extract/css";
import { mediaQuery } from "./global.css";

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
  layerName = "vanilla",
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
      })
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

type MQProps = Omit<StyleRule, "@media">;
export const mq = (rules: {
  mobile?: MQProps;
  tablet?: MQProps;
  desktop?: MQProps;
}) => ({
  "@media": {
    [mediaQuery.max.mobile]: (rules.mobile ?? {}) as MQProps,
    [mediaQuery.max.tablet]: (rules.tablet ?? {}) as MQProps,
    [mediaQuery.min.tablet]: (rules.desktop ?? {}) as MQProps,
  },
});
