import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const spaceInfoStyles = appStyles({
  box: {
    border: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    padding: "24px 20px",
    borderRadius: "16px",
    width: "100%",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "90px",
    justifyContent: "space-between",
  },

  textBold: {
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
  },
  textBoldRight: {
    textAlign: "right",
    ...getTextStyles("Grayscale/Black", "Title/24px/24px.700"),
  },
  textDefault: {
    whiteSpace: "break-spaces",
    ...getTextStyles("Grayscale/Gray 500", "Body/16px/16px.500"),
  },

  textTitleDefault: {
    ...getTextStyles("Grayscale/Gray 500", "Title/18px/18px.400"),
    marginBottom: "8px",
  },
});
