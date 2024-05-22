import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const tableStyles = appStyles({
  th: {
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    backgroundColor: vars.colors["Grayscale/Gray 100"],
    padding: "8px 16px",
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.400"),
  },
  td: {
    border: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    padding: "8px 16px",
    ...getTextStyles("Grayscale/Gray 500", "Body/16px/16px.400"),
  },
});
