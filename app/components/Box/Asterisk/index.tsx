import clsx from "clsx";
import { Sprinkles, rainbowSprinkles } from "~/styles/rainbow-sprinkles.css";
import { asterisk } from "./styles.css";

export function Asterisk(props: Sprinkles) {
  const { className, style } = rainbowSprinkles(props);
  return (
    <div className={clsx(asterisk, className)} style={style}>
      <span>*</span>
    </div>
  );
}

export default Asterisk;
