import { globalLayer, globalStyle } from "@vanilla-extract/css";
import { getTextStyles } from "./helpers";

globalLayer("global");
globalLayer("app");
globalLayer("sprinkles");

globalStyle("html, body", {
  "@layer": {
    global: {
      ...getTextStyles("Grayscale/Gray 500", "Body/16px/16px.400"),
    },
  },
});
