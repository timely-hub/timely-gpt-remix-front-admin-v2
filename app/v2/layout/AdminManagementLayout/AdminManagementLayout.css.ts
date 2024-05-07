import { style } from "@vanilla-extract/css";

const adminManagementLayoutStyles = {
  wrap: style({
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  }),
  container: style({
    width: "25%",
    backgroundColor: "gray",
  }),
};

export default adminManagementLayoutStyles;
