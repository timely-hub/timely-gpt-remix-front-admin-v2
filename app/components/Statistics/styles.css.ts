import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const statisticsSpaceStyle = appStyles({
  title: {
    ...getTextStyles("Grayscale/Black", "Title/32px/32px.700"),
  },
  table: {
    height: "400px",
    border: "none",
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
    marginBottom: "24px",
  },
});
