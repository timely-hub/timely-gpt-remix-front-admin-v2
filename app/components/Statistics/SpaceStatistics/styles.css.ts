import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const recentStatisticsStyle = appStyles({
  statisticsTab: {
    borderRadius: "16px",
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    padding: "24px 20px",
    width: "25%",
    height: "fit-content",
  },
  statisticsTitle: {
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
    marginBottom: "16px",
  },
  statisticValue: {
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
    margin: "0",
    textAlign: "right",
  },
});
