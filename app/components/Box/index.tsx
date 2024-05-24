import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { FontStylesKey, fontStyles } from "~/styles/vars.css";

export type BoxProps = {
  font?: FontStylesKey;
} & SprinklesOmit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;
const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { className, font, ...props },
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
      className={clsx(className, font ? fontStyles[font] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export const Flex = forwardRef<
  HTMLDivElement,
  { font?: FontStylesKey } & SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >
>(function Flex({ display = "flex", ...props }, ref) {
  return <Box display={display} {...props} ref={ref} />;
});

export const Div = forwardRef<
  HTMLDivElement,
  { font?: FontStylesKey } & SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >
>(function Box({ font, className, ...props }, ref) {
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
      className={clsx(className, font ? fontStyles[font] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export const Span = forwardRef<
  HTMLSpanElement,
  { font?: FontStylesKey } & SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
  >
>(function Box({ font, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <span
      ref={ref}
      className={clsx(className, font ? fontStyles[font] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </span>
  );
});

export default Box;
