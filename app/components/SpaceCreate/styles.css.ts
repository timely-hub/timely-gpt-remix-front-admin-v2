import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";

export const spaceCreateStyle = appStyles({
  title: {
    ...getTextStyles("Grayscale/Black", "Title/32px/32px.700"),
    marginBottom: "24px",
  },
});
