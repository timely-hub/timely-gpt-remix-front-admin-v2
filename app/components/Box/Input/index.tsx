import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { fontStyles } from "~/styles/vars.css";
import { FontStyleProps } from "../types";

export const Input = forwardRef<
  HTMLInputElement,
  FontStyleProps &
    SprinklesOmit<
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    >
>(function Box({ font, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  return (
    <input
      ref={ref}
      className={clsx(className, font ? fontStyles[font] : "", rcn)}
      style={style}
      {...otherProps}
    />
  );
});
