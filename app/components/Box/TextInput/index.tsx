import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import {
  Sprinkles,
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { textInputStyles as css } from "./styles.css";

export interface TextInputProps
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      | "children"
      | "disabled"
      | "readOnly"
      | "prefix"
      | "suffix"
      | "wrapClassName"
    >
  > {
  icon?: {
    type: string;
    onClick?: () => void;
  };
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  wrapClassName?: string;
  className?: string;
  wrapSprinkles?: Sprinkles;
  error?: boolean;
  validator?: (value: string) => boolean | void | null;
}
const TextInput = (
  {
    error,
    disabled,
    readOnly,
    wrapClassName,
    className,
    onFocus,
    onChange,
    prefix,
    suffix,
    onBlur,
    validator,
    wrapSprinkles,
    ...props
  }: TextInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const { className: wrapClass, style: wrapStyle } = rainbowSprinkles({
    ...wrapSprinkles,
  });
  const {
    className: inputClass,
    style: inputStyle,
    otherProps,
  } = rainbowSprinkles(props);
  const [focused, setFocused] = useState(false);
  const firstFocus = React.useRef(false);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <div
        style={wrapStyle}
        className={clsx(
          css.wrap,
          {
            disabled,
            readOnly,
            focus: focused,
            error: error || isError,
          },
          wrapClassName,
          wrapClass
        )}
      >
        {prefix}
        <input
          ref={ref}
          onFocus={(e) => {
            setFocused(true);
            if (!firstFocus.current) {
              firstFocus.current = true;
              e.target.select();
            }
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={clsx(css.input, className, inputClass)}
          style={inputStyle}
          onChange={(e) => {
            const targetValue = e.target.value;
            const validCheck = validator?.(targetValue);
            const valid = targetValue ? Boolean(validCheck) : false;
            setIsError(Boolean(valid));
            onChange && onChange(e);
          }}
          disabled={disabled}
          readOnly={readOnly}
          {...otherProps}
        />
        {suffix}
      </div>
    </>
  );
};
export default React.memo(forwardRef(TextInput)) as typeof TextInput;
