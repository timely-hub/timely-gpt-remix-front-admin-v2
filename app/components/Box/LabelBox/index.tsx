import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { fontStyles } from "~/styles/vars.css";
import { FontStyleProps } from "../types";
import { labelBoxStyles } from "./styles.css";

export type labelBoxProps = {
  label: string | JSX.Element;
} & FontStyleProps &
  SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >;

const LabelBox = forwardRef<HTMLDivElement, labelBoxProps>(function labelBox(
  { className, label, font, ...props },
  ref
) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <div
      ref={ref}
      className={clsx(
        labelBoxStyles.labelBox,
        className,
        font ? fontStyles[font] : "",
        rcn
      )}
      style={style}
      {...otherProps}
    >
      <div className={labelBoxStyles.label}>{label}</div>
      {children}
    </div>
  );
});

export default LabelBox;
