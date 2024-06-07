import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const spaceCreateStyle = appStyles({
  title: {
    ...getTextStyles("Grayscale/Black", "Title/32px/32px.700"),
    marginBottom: "24px",
  },
  ul: {
    border: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    borderRadius: "8px",
    padding: "8px 16px",
  },
  li: {
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.400"),
    ":hover": {
      backgroundColor: vars.colors["Grayscale/Gray 100"],
    },
  },
});
