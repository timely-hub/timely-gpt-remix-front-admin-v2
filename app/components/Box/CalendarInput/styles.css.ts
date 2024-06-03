import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "~/styles/vars.css";

const calendarInputStyle = {
  wrap: style({
    position: "relative",
    border: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    borderRadius: "8px",
    width: "inherit",
    backgroundColor: vars.colors["Grayscale/White"],
    userSelect: "none",
    color: vars.colors["Grayscale/Black"],
    ...vars.typography["Body/14px/14px.400"],
  }),
  focus: style({
    borderColor: vars.colors["Primary/Primary 500"],
  }),
  inner: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    cursor: "pointer",
    gap: "4px",
  }),
  calendarBox: style({
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "-1px",
    zIndex: 10,
  }),
};

globalStyle(`${calendarInputStyle.wrap}.disabled`, {
  opacity: "0.5",
  color: vars.colors["Grayscale/Gray 300"],
});
globalStyle(`${calendarInputStyle.inner} > span`, {
  flex: "1",
});
globalStyle(`${calendarInputStyle.inner} > svg.reverse`, {
  transform: "rotate(180deg)",
});
globalStyle(`${calendarInputStyle.inner} > svg.reverse path`, {
  stroke: vars.colors["Grayscale/Gray 300"],
});
globalStyle(`${calendarInputStyle.inner}.placeholder span`, {
  color: vars.colors["Grayscale/Gray 300"],
});

export default calendarInputStyle;
