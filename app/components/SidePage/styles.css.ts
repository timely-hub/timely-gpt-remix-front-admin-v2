import { appStyles } from "~/styles/layer.css";
import { vars } from "~/styles/vars.css";

export const adminPageSideStyle = appStyles({
  wrap: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "0",
    width: "100%",
    position: "relative",
  },
  menuLink: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 8px",
    cursor: "pointer",
    textDecoration: "none",
  },
  submenuWrap: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 8px",
    cursor: "pointer",
    textDecoration: "none",
  },
  menuDropdown: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px 8px",
    border: "none",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    width: "100%",
  },
  menuTitle: {
    ...vars.typography["Title/18px/18px.700"],
    color: vars.colors["Grayscale/Black"],
    borderLeft: "0px solid transparent",
    transition: "0.15s",
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
  },
  selected: {
    color: vars.colors["Primary/Primary 500"],
    ...vars.typography["Title/18px/18px.700"],
  },
  submenuTitle: {
    color: vars.colors["Grayscale/Gray 500"],
    ...vars.typography["Body/16px/16px.400"],
  },
  subMenuSelected: {
    color: vars.colors["Primary/Primary 500"],
  },
  arrowBox: {
    display: "flex",
    backgroundColor: vars.colors["Grayscale/Gray 50"],
    borderRadius: "4px",
  },
  asideWrap: {
    padding: "32px 16px",
  },
  dropdownWrap: {
    flexDirection: "column",
  },
  hidden: {
    display: "none",
  },
});
