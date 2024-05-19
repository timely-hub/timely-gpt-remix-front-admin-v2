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
  },
  table: {
    width: "100%",
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
  },
  tableBorderBottom: {
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
  },
  th: {
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    padding: "8px 16px",
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.400"),
  },
  thBorderBottom: {
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    padding: "8px 16px",
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.400"),
  },
  td: {
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    padding: "8px 16px",
  },
  tdBorderNone: {
    border: `none`,
    padding: "8px 16px",
  },
  title: {
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.400"),
    marginBottom: "24px",
  },
  boxTitle: {
    ...getTextStyles("Grayscale/Gray 500", "Body/16px/16px.400"),
  },
});
