import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";

export const labelBoxStyles = appStyles({
  labelBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    ...getTextStyles("Grayscale/Gray 500", "Body/14px/14px.500"),
  },
});
