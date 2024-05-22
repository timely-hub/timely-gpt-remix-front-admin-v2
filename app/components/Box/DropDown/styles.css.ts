import { globalStyle } from "@vanilla-extract/css";
import {
  getBgColor,
  getBorder,
  getFontColor,
  getInsetBorder,
  getShadow,
  getTextStyles,
} from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

const dropdownStyle = appStyles({
  wrap: {
    display: "inline-block",
    position: "relative",
    appearance: "button",
    width: "inherit",
  },
  labelWrap: {
    width: "inherit",
    ...getInsetBorder(1, "Grayscale/Gray 100"),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    gap: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    userSelect: "none",
    ...getInsetBorder(1, "Grayscale/Gray 100", 8),
    "&:focus": {
      ...getInsetBorder(1, "Primary/Primary 500", 8),
    },
    "&:disabled": {
      backgroundColor: vars.colors["Grayscale/Gray 50"],
      ...getInsetBorder(1, "Grayscale/Gray 100", 8),
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    flex: "1",
    flexShrink: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...getTextStyles("Grayscale/Black", "Body/14px/14px.400"),
  },
  placeholder: {
    ...getFontColor("Grayscale/Gray 300"),
  },
  dropdown: {
    position: "absolute",
    minWidth: "100%",
    zIndex: 999,
    ...getShadow("ShadowMd"),
    ...getBgColor("Grayscale/White"),
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    borderRadius: "8px",
    visibility: "hidden",
    overflow: "hidden",
    opacity: 0,
    transform: "translateY(0.5rem)",
    transition: "all 0.1s cubic-bezier(0.16, 1, 0.5, 1)",
    ...getBorder(1, "Grayscale/Gray 100", 8),
    ":focus": {
      outline: "none",
      ...getBorder(1, "Primary/Primary 500", 8),
    },
  },
  item: {
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    padding: "10px 16px",
    whiteSpace: "nowrap",
    transition: "all 0.1s cubic-bezier(0.16, 1, 0.5, 1)",
    backgroundColor: "transparent",
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    ...getTextStyles("Grayscale/Gray 500", "Body/14px/14px.400"),
    ":hover": {
      ...getBgColor("Grayscale/Gray 50"),
    },
    ":first-of-type": {
      borderRadius: "8px 8px 0 0",
    },
    ":last-of-type": { borderBottom: "none", borderRadius: "0 0 8px 8px" },
    ":focus": {
      outline: "none",
      ...getInsetBorder(1, "Primary/Primary 500"),
    },
  },
});

globalStyle(`${dropdownStyle.labelWrap} svg`, {
  flexShrink: 0,
});

globalStyle(`${dropdownStyle.labelWrap}:disabled ${dropdownStyle.label}`, {
  ...getFontColor("Grayscale/Gray 300"),
});

globalStyle(`${dropdownStyle.labelWrap} svg`, {
  transition: "transform 0.3s",
});
globalStyle(`${dropdownStyle.labelWrap} svg.reverse`, {
  transform: "rotate(-180deg)",
});

globalStyle(`${dropdownStyle.dropdown}.open`, {
  visibility: "visible",
  opacity: 1,
  transform: "translateY(0)",
});
globalStyle(`${dropdownStyle.item}.active:not(:hover)`, {
  ...getFontColor("Primary/Primary 500"),
});

/**
 * 실제 아이콘의 data-fill, data-stroke 속성을 이용하여 색상을 변경하는 경우에만 사용.
 */
globalStyle(`${dropdownStyle.item}.active:not(:hover) path:[data-fill]`, {
  fill: vars.colors["Primary/Primary 500"],
});
globalStyle(`${dropdownStyle.item}.active:not(:hover) path:[data-stroke]`, {
  stroke: vars.colors["Primary/Primary 500"],
});
/**
 * 아래는 일반적인 경우에만 적용되어서, 변동의 여지가 있음.
 */
globalStyle(
  `${dropdownStyle.item}.active:not(:hover) path:not([clip-rule])[fill]`,
  {
    fill: vars.colors["Primary/Primary 500"],
  }
);
globalStyle(
  `${dropdownStyle.item}.active:not(:hover) path:not([stroke])[fill-rule][clip-rule]`,
  {
    fill: vars.colors["Primary/Primary 500"],
  }
);
globalStyle(
  `${dropdownStyle.item}.active:not(:hover) path:not([clip-rule])[stroke]`,
  {
    stroke: vars.colors["Primary/Primary 500"],
  }
);
export default dropdownStyle;
