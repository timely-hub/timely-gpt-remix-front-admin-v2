import { getTextStyles } from "~/styles/helpers";
import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const tableStyles = appStyles({
  table: {
    border: "none",
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 200"]}`,
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: "0",
    textAlign: "left",
    tableLayout: "fixed",
    marginBottom: "24px",
  },
  th: {
    border: "none",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderBottom: `1px solid ${vars.colors["Grayscale/Gray 100"]}`,
    padding: "14px 16px",
    ...getTextStyles("Grayscale/Gray 500", "Body/14px/14px.500"),
  },
  td: {
    border: `none`,
    padding: "16px",
    ...getTextStyles("Grayscale/Black", "Body/14px/14px.400"),
  },
  roleOwner: {
    ...getTextStyles("Primary/Primary 500", "Body/12px/12px.500"),
    backgroundColor: vars.colors["Primary/Primary 50"],
    padding: "2px 8px",
    borderRadius: "100px",
  },
  roleOther: {
    ...getTextStyles("Grayscale/Gray 500", "Body/12px/12px.500"),
    backgroundColor: vars.colors["Primary/Primary 50"],
    padding: "2px 8px",
    borderRadius: "100px",
  },
  statusApproved: {
    ...getTextStyles("Primary/Primary 500", "Body/12px/12px.500"),
    backgroundColor: vars.colors["Primary/Primary 50"],
    padding: "2px 8px",
    borderRadius: "100px",
  },
  statusPending: {
    ...getTextStyles("Primary/Primary 500", "Body/12px/12px.500"),
    backgroundColor: vars.colors["Primary/Primary 50"],
    padding: "2px 8px",
    borderRadius: "100px",
  },
});
