import { getTextStyles } from "./helpers";
import { appStyles } from "./layer.css";
import { vars } from "./vars.css";

export const promptBoxStyle = appStyles({
  box: {
    border: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    borderRadius: "16px",
    padding: "24px 20px",
    backgroundColor: vars.colors["Grayscale/White"],
    width: "24%",
  },
  title: {
    ...getTextStyles("Grayscale/Black", "Body/16px/16px.700"),
    marginBottom: "8px",
  },
  description: {
    ...getTextStyles("Grayscale/Gray 400", "Body/14px/14px.400"),
    marginBottom: "16px",
  },
  name: {
    ...getTextStyles("Grayscale/Gray 300", "Body/12px/12px.400"),
  },
  llmModel: {
    padding: "2px 8px",
    backgroundColor: vars.colors["Red/Red 50"],
    borderRadius: "4px",
    ...getTextStyles("Red/Red 500", "Body/12px/12px.500"),
  },
  category: {
    padding: "2px 8px",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderRadius: "4px",
    ...getTextStyles("Grayscale/Gray 500", "Body/12px/12px.500"),
  },
  checked: {
    backgroundColor: vars.colors["Grayscale/Gray 100"],
  },
  img: {
    borderRadius: "4px",
  },
});
