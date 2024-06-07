import { keyframes } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { getBgColor, getTextStyles } from "~/styles/helpers";
import { appStyles, globalAppStyle } from "~/styles/layer.css";

const slideIn = keyframes({
  "0%": { transform: "translate(-50%, calc(-100% - 40px))", opacity: 0 },
  "100%": { transform: "translate(-50%, 0)", opacity: 1 },
});

const hideUp = keyframes({
  "0%": { transform: "translate(-50%, 0)", opacity: 1 },
  "100%": { transform: "translate(-50%, calc(-100% - 40px))", opacity: 0 },
});

export const toastStyles = appStyles({
  wrap: {
    position: "fixed",
    top: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    zIndex: 10002,
  },
  messages: {
    position: "relative",
    zIndex: 10002,
  },
  message: {
    ...getTextStyles("Grayscale/White", "Body/14px/14px.500"),
    ...getBgColor("Grayscale/Black"),
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, calc(-100% - 40px))",
    padding: "10px 16px",
    borderRadius: "9px",
    zIndex: 10002,
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "flex-start",
    textAlign: "left",
    maxWidth: calc.subtract("100svw", "36px"),
    gap: "10px",
    selectors: {
      "&:hover": {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      },
    },
  },
});

globalAppStyle(`${toastStyles.message}.show`, {
  animation: `${slideIn} 0.5s forwards ease-in-out 0s`,
});
globalAppStyle(`${toastStyles.message}.hide`, {
  animation: `${hideUp} 0.5s forwards ease-in-out 0s`,
});
globalAppStyle(`${toastStyles.message}.animation-pause`, {
  animationPlayState: "paused",
});
globalAppStyle(`${toastStyles.message} svg`, {
  flexShrink: 0,
});
globalAppStyle(`${toastStyles.message} span`, {
  whiteSpace: "pre-line",
  width: "max-content",
});
