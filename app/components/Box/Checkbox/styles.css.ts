import {
  getBgColor,
  getBorder,
  getColor,
  getTextStyles,
} from "~/styles/helpers";
import { appStyles, globalAppStyle } from "~/styles/layer.css";

export const checkboxStyles = appStyles({
  wrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ...getTextStyles("Grayscale/Black", "Body/14px/14px.400"),
    "&:focus": {
      outline: "none",
    },
  },
  box: {
    position: "relative",
    display: "inline-block",
    width: "20px",
    height: "20px",
    ...getBorder(1, "Grayscale/Gray 100", 4),
    ...getBgColor("Grayscale/White"),
    cursor: "pointer",
    transition: "0.4s",
  },
  checker: {
    opacity: 0,
  },
});

globalAppStyle(`${checkboxStyles.box}.active ${checkboxStyles.checker}`, {
  opacity: 1,
});

globalAppStyle(`${checkboxStyles.box}.active`, {
  ...getBgColor("Primary/Primary 500"),
});

globalAppStyle(`${checkboxStyles.box}:hover`, {
  ...getBgColor("Primary/Primary 100"),
});

globalAppStyle(`${checkboxStyles.wrap}:focus ${checkboxStyles.box}`, {
  boxShadow: `0 0 0 2px ${getColor("Primary/Primary 100")}`,
});
