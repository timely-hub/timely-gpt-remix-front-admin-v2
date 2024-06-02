import { keyframes } from "@vanilla-extract/css";
import { getBgColor, getTextStyles } from "~/styles/helpers";
import { appStyles, globalAppStyle } from "~/styles/layer.css";

const bounceSlideIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(-100%)",
  },
  "25%": {
    opacity: 1,
    transform: "translateY(calc(0% + 30px))",
  },
  "35%": {
    transform: "translateY(calc(0% - 20px))",
  },
  "45%": {
    transform: "translateY(calc(0% + 10px))",
  },
  "65%": {
    transform: "translateY(calc(0% - 5px))",
  },
  "70%": {
    transform: "translateY(0%)",
  },
  "100%": {
    transform: "translateY(0%)",
  },
});
export const modalContainerStyles = appStyles({
  wrap: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    zIndex: 1001,
    height: "100vh",
    transform: "translateY(-100%)",
  },
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    zIndex: 2,
    borderRadius: "16px",
    ...getBgColor("Grayscale/White"),
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "24px 24px 16px 24px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "8px 24px 24px",
    minWidth: "320px",
    minHeight: "200px",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    ...getTextStyles("Grayscale/Black", "Title/18px/18px.700"),
  },
  subTitle: {
    ...getTextStyles("Grayscale/Gray 400", "Body/16px/16px.400"),
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
    gap: "8px",
    padding: "8px 24px 24px",
  },
  dim: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(61, 64, 67, 0.7)",
  },
  dimClick: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    cursor: "pointer",
  },
});

globalAppStyle(`${modalContainerStyles.wrap}.slideIn`, {
  animation: `${bounceSlideIn} 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards`,
});
globalAppStyle(`${modalContainerStyles.wrap}.fixed`, {
  animation: "none",
  transform: "translateY(0%)",
});
