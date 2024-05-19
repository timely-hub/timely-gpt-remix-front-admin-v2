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
import { Div } from "../index";
import styles from "./styles.css";

export interface TextInputProps
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      "children" | "disabled" | "readOnly"
    >
  > {
  theme?: "line" | "default" | "border" | "none" | "";
  before?: React.ReactNode;
  after?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  wrapClassName?: string;
  className?: string;
  wrapSprinkles?: Sprinkles;
  validator?: (value: string) => string | null | false | void;
  validatorRender?: ({ message }: { message: string }) => React.ReactNode;
}
const TextInput = (
  {
    theme = "default",
    disabled,
    readOnly,
    wrapClassName,
    className,
    onFocus,
    onChange,
    before,
    after,
    onBlur,
    validator,
    validatorRender,
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
  const [isError, setIsError] = useState("");

  return (
    <>
      <div
        style={wrapStyle}
        className={clsx(
          styles.wrap,
          theme,
          {
            disabled,
            readOnly,
            focus: focused,
            error: isError,
            ["error-bottom"]: validatorRender && isError,
          },
          wrapClassName,
          wrapClass
        )}
      >
        {before}
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
          className={clsx(styles.input, className, inputClass)}
          style={inputStyle}
          onChange={(e) => {
            setIsError("");
            if (validator && !!e.target.value) {
              const errorMessage = validator(e.target.value);
              setIsError(
                errorMessage ? errorMessage ?? "validation error" : ""
              );
            }
            onChange && onChange(e);
          }}
          disabled={disabled}
          readOnly={readOnly}
          {...otherProps}
        />
        <div
          className={clsx(styles.button, {
            ["hidden"]: readOnly || disabled,
          })}
          onClick={(e) => {
            e.stopPropagation();
            setFocused(true);
            const inputTarget = (
              e.currentTarget as HTMLDivElement
            ).parentElement!.querySelector("input");
            onChange &&
              onChange({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>);
            if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement>).current.value =
                "";
            } else if (inputTarget) {
              inputTarget.value = "";
            }
            if (inputTarget) {
              inputTarget.focus();
            }
          }}
        ></div>
        {after}
        {validatorRender && isError && validatorRender({ message: isError })}
      </div>
      {!validatorRender && isError && theme === "none" && (
        <Div display={"flex"} marginLeft={"128px"} alignItems={"center"}></Div>
      )}
    </>
  );
};
export default React.memo(forwardRef(TextInput)) as typeof TextInput;
