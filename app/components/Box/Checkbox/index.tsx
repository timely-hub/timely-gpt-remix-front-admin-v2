import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { rainbowSprinkles } from "~/styles/rainbow-sprinkles.css";
import { ButtonProps } from "~/types/shared.types";
import CheckIcon from "./check.svg";
import { checkboxStyles as css } from "./styles.css";

interface CheckboxProps
  extends Omit<ButtonProps, "name" | "prefix" | "suffix" | "onClick"> {
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  name?: string;
  active?: boolean;
  onClick?: (active: boolean) => void;
}

export default function Checkbox({
  active,
  name,
  prefix,
  suffix,
  onClick,
  ...props
}: CheckboxProps) {
  const { className, style, otherProps } = rainbowSprinkles({ ...props });
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentActive, set_currentActive] = useState(active);

  const changeInput = useCallback((nextActive: boolean) => {
    if (inputRef.current) {
      inputRef.current.checked = nextActive ? true : false;
      inputRef.current.value = nextActive ? "on" : "off";
      inputRef.current.setAttribute(
        "aria-checked",
        nextActive ? "true" : "false"
      );
    }
  }, []);

  useEffect(() => {
    if (active !== undefined) {
      set_currentActive(active);
    }
  }, [active]);

  useEffect(() => {
    if (currentActive !== undefined) {
      changeInput(currentActive);
    }
  }, [currentActive, changeInput]);

  return (
    <button
      type="button"
      className={clsx(css.wrap, className)}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        const nextActive = !currentActive;
        changeInput(nextActive);
        if (onClick) {
          onClick(nextActive);
        } else {
          set_currentActive(nextActive);
        }
      }}
      {...otherProps}
    >
      {name && (
        <input
          ref={inputRef}
          name={name}
          type="checkbox"
          style={{
            visibility: "hidden",
            display: "none",
          }}
        />
      )}
      {prefix}
      <div className={clsx(css.box, { active: currentActive })}>
        <img src={CheckIcon} alt={"checkbox"} className={css.checker} />
      </div>
      {suffix}
    </button>
  );
}
