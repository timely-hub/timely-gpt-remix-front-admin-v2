import clsx from "clsx";
import React, { forwardRef } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import buttonsStyles, {
  buttonDefaultStyle,
  buttonLoadingStyle,
  sizes,
} from "./styles.css";

interface ButtonsProps
  extends SprinklesOmit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {
  pending?: boolean;
  theme?: keyof typeof buttonsStyles;
  size?: "small" | "large";
  label?: string;
}

const Buttons = (
  {
    pending,
    className,
    children,
    size = "large",
    theme = "primaryFilled",
    ...props
  }: ButtonsProps,
  ref: React.Ref<HTMLButtonElement>
) => {
  const themeClass = theme
    ? buttonsStyles[theme as keyof typeof buttonsStyles] ?? ""
    : "";
  const { style, className: rcn, otherProps } = rainbowSprinkles(props);
  return (
    <button
      ref={ref}
      className={clsx(
        buttonDefaultStyle,
        sizes[size],
        themeClass,
        className,
        rcn
      )}
      style={style}
      {...otherProps}
    >
      {pending ? (
        <div className={buttonLoadingStyle}>
          <BiLoaderAlt />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default forwardRef(Buttons) as typeof Buttons;
