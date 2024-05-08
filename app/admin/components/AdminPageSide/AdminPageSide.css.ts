import { style } from "@vanilla-extract/css";
import { vars } from "~/admin/styles/global.css";

const AdminPageSideStyle = {
  wrap: style({
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "0",
    width: "100%",
    position: "relative",
  }),
  menuLink: style({
    display: "flex",
    flexDirection: "column",
    padding: "16px 8px",
    color: vars.colors.Grayscale_Gray500,
    ...vars.typography["Title/18px/18px.700"],
    textDecoration: "none",
  }),
  menuTitle: style({
    ...vars.typography["Title/18px/18px.700"],
    color: vars.colors.Grayscale_Black,
    borderLeft: "0px solid transparent",
    transition: "0.15s",
    display: "flex",
    justifyContent: "space-between",
  }),
  submenuTitle: style({
    ...vars.typography["Body/16px/16px.400"],
  }),
  arrowBox: style({
    display: "flex",
    backgroundColor: vars.colors.Grayscale_Gray100,
    borderRadius: "4px",
  }),
  asideWrap: style({
    padding: "32px 16px",
  }),
};

export default AdminPageSideStyle;
