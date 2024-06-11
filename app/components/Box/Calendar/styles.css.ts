import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "~/styles/vars.css";

const calendarStyle = {
  wrap: style({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: vars.colors["Grayscale/White"],
    padding: "20px 16px",
    minWidth: "286px",
  }),
  header: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 16px",
    backgroundColor: vars.colors["Grayscale/White"],
  }),
  headerCenter: style({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    ...vars.typography["Body/14px/14px.700"],
  }),
  body: style({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }),
  week: style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0px",
  }),
  month: style({
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  }),
  day: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    padding: "10px 0",
    color: vars.colors["Grayscale/Black"],
    cursor: "pointer",
    userSelect: "none",
    ...vars.typography["Body/12px/12px.400"],
  }),
  dayInner: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    width: "20px",
    height: "20px",
  }),
  weekName: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "24px",
    height: "24px",
    color: vars.colors["Grayscale/Black"],
    ...vars.typography["Body/12px/12px.700"],
  }),
};

globalStyle(`${calendarStyle.header} svg`, {
  fontSize: "20px",
});
globalStyle(
  `${calendarStyle.day}.today:not(.selected) ${calendarStyle.dayInner}`,
  {
    color: vars.colors["Primary/Primary 500"],
    ...vars.typography["Body/12px/12px.700"],
  }
);

globalStyle(
  `${calendarStyle.day}.sunday:not(.selected) ${calendarStyle.dayInner}`,
  {
    color: vars.colors["Red/Red 500"],
  }
);

globalStyle(`${calendarStyle.day}.saturday ${calendarStyle.dayInner}`, {});

globalStyle(
  `${calendarStyle.day}.grayed:not(.selected) ${calendarStyle.dayInner}`,
  {
    color: vars.colors["Grayscale/Gray 300"],
  }
);

globalStyle(`${calendarStyle.day}.selected ${calendarStyle.dayInner}`, {
  backgroundColor: vars.colors["Primary/Primary 500"],
  color: vars.colors["Grayscale/White"],
  ...vars.typography["Body/12px/12px.700"],
});

export default calendarStyle;
