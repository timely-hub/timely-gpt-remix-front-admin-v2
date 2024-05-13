import { style } from "@vanilla-extract/css";
import { vars } from "~/admin/styles/global.css";

const dashBoardStyles = {
  container: style({
    padding: "32px 24px",
  }),
  statisticsTab: style({
    borderRadius: "16px",
    border: `1px solid ${vars.colors.Grayscale_Gray100}`,
    padding: "24px 20px",
    width: "20%",
  }),
  table: style({
    width: "100%",
    border: `1px solid ${vars.colors.Grayscale_Gray200}`,
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
  }),
  tableBorderBottom: style({
    borderBottom: `1px solid ${vars.colors.Grayscale_Gray200}`,
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
  }),
  th: style({
    border: `1px solid ${vars.colors.Grayscale_Gray200}`,
    backgroundColor: vars.colors.Grayscale_Gray50,
    padding: "8px 16px",
    ...vars.typography["Body/16px/16px.400"],
  }),

  thBorderBottom: style({
    backgroundColor: vars.colors.Grayscale_Gray50,
    borderBottom: `1px solid ${vars.colors.Grayscale_Gray100}`,
    padding: "8px 16px",
    ...vars.typography["Body/16px/16px.400"],
  }),
  td: style({
    border: `1px solid ${vars.colors.Grayscale_Gray200}`,
    padding: "8px 16px",
  }),

  tdBorderNone: style({
    border: `none`,
    padding: "8px 16px",
  }),
};

export default dashBoardStyles;
