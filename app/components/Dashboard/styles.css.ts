import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const dashboardStyle = appStyles({
  container: {
    padding: "32px 24px",
  },
  statisticsTab: {
    borderRadius: "16px",
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    padding: "24px 20px",
    width: "20%",
    height: "fit-content",
  },
  table: {
    width: "100%",
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
    marginBottom: "24px",
  },
  tableBorderBottom: {
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
    marginBottom: "24px",
  },
  thBorderBottom: {
    border: "none",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    padding: "8px 16px",
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.400"),
  },
  tdBorderNone: {
    border: `none`,
    padding: "8px 16px",
  },
  tdLink: {
    color: vars.colors["Blue/Blue 500"],
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "none",
    },
  },
  title: {
    ...getTextStyles("Grayscale/Black", "Title/32px/32px.700"),
  },
  statisticsTitle: {
    ...getTextStyles("Grayscale/Gray 500", "Body/16px/16px.500"),
    marginBottom: "8px",
  },
  statisticValue: {
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
    margin: "0",
    textAlign: "right",
  },
  boxTitle: {
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
    marginBottom: "16px",
  },
});
