import {
  getBgColor,
  getBorder,
  getFontColor,
  getInsetBorder,
  getShadow,
  getTextStyles,
} from "~/styles/helpers";
import { appStyles, globalAppStyle } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

const selectorStyles = appStyles({
  wrap: {
    position: "relative",
    appearance: "button",
    width: "inherit",
    ...getBgColor("Grayscale/White"),
  },
  labelWrap: {
    width: "100%",
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
    width: "100%",
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
    ":active:focus": {
      border: "none",
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
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
    ":last-of-type": {
      borderBottom: "none",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    },
    ":focus": {
      outline: "none",
      ...getInsetBorder(1, "Primary/Primary 500"),
    },
    ":active": {
      outline: "none",
      border: "none",
      boxShadow: "none",
    },
  },
  active: {
    ...getFontColor("Primary/Primary 500"),
  },
  big: {
    padding: "14px 16px",
  },
});

globalAppStyle(`${selectorStyles.labelWrap} svg`, {
  flexShrink: 0,
});

globalAppStyle(`${selectorStyles.labelWrap}:disabled ${selectorStyles.label}`, {
  ...getFontColor("Grayscale/Gray 300"),
});

globalAppStyle(`${selectorStyles.labelWrap} svg`, {
  transition: "transform 0.3s",
});
globalAppStyle(`${selectorStyles.labelWrap} svg.reverse`, {
  transform: "rotate(-180deg)",
});

globalAppStyle(`${selectorStyles.dropdown}.open`, {
  visibility: "visible",
  opacity: 1,
  transform: "translateY(0)",
});
globalAppStyle(`${selectorStyles.item}.${selectorStyles.active}:not(:hover)`, {
  ...getFontColor("Primary/Primary 500"),
});

/**
 * 실제 아이콘의 data-fill, data-stroke 속성을 이용하여 색상을 변경하는 경우에만 사용.
 */
globalAppStyle(
  `${selectorStyles.item}.${selectorStyles.active}:not(:hover) path[data-fill]`,
  {
    fill: vars.colors["Primary/Primary 500"],
  }
);
globalAppStyle(
  `${selectorStyles.item}.${selectorStyles.active}:not(:hover) path[data-stroke]`,
  {
    stroke: vars.colors["Primary/Primary 500"],
  }
);
/**
 * 아래는 일반적인 경우에만 적용되어서, 변동의 여지가 있음.
 */
globalAppStyle(
  `${selectorStyles.item}.${selectorStyles.active}:not(:hover) path:not([clip-rule])[fill]`,
  {
    fill: vars.colors["Primary/Primary 500"],
  }
);
globalAppStyle(
  `${selectorStyles.item}.${selectorStyles.active}:not(:hover) path:not([stroke])[fill-rule][clip-rule]`,
  {
    fill: vars.colors["Primary/Primary 500"],
  }
);
globalAppStyle(
  `${selectorStyles.item}.active:not(:hover) path:not([clip-rule])[stroke]`,
  {
    stroke: vars.colors["Primary/Primary 500"],
  }
);
export default selectorStyles;
