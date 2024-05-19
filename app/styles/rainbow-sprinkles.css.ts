import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { figmaColors } from "./vars.css";

export type DynamicProperties = keyof (typeof responsiveProperties)["config"];

// dom의 attributes에 있는 css 속성들을 제외한 후 Sprinkles 속성들을 정의
// sprinkles 속성들은 css 속성들을 확장한 것이므로 css 속성들을 제외한 후 sprinkles 속성들을 정의
export type SprinklesOmit<T> = Omit<T, DynamicProperties> & Sprinkles;

const responsiveProperties = defineProperties({
  "@layer": "sprinkles",
  conditions: {
    desktop: {},
  },
  defaultCondition: "desktop",
  dynamicProperties: {
    fontSize: true,
    fontWeight: true,
    lineHeight: true,
    textOverflow: true,
    letterSpacing: true,
    color: figmaColors,
    backgroundColor: figmaColors,
    borderColor: figmaColors,
    border: true,
    borderStyle: true,
    fill: figmaColors,
    stroke: figmaColors,
    caretColor: figmaColors,
    opacity: true,
    borderWidth: true,
    margin: true,
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
    display: true,
    padding: true,
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
    gap: true,
    width: true,
    height: true,
    maxWidth: true,
    minWidth: true,
    maxHeight: true,
    minHeight: true,
    flex: true,
    alignItems: true,
    justifyContent: true,
    textAlign: true,
    borderRadius: true,
    boxShadow: true,
    transform: true,
    transition: true,
    cursor: true,
    userSelect: true,
    pointerEvents: true,
    zIndex: true,
    position: true,
    top: true,
    right: true,
    bottom: true,
    left: true,
    whiteSpace: true,
    overflow: true,
    overflowX: true,
    overflowY: true,
    flexWrap: true,
    flexDirection: true,
    flexBasis: true,
    flexShrink: true,
    flexGrow: true,
    gridTemplateColumns: true,
    gridColumn: true,
    borderBottom: true,
    borderLeft: true,
  },
});

export const rainbowSprinkles = createRainbowSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof rainbowSprinkles>[0];
