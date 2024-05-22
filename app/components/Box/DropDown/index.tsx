import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ArrowDown from "~/assets/icons/ArrowDown.svg?react";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import dropdownStyle from "./styles.css";

export type DropdownListType<T extends string | number> = {
  icon?: React.ReactNode;
  key: T;
  label: string | number;
};

export const parserForObjectArray = <K extends object, T extends keyof K>(
  list: K[],
  keyName: T,
  labelName: keyof K,
  order: "asc" | "desc" = "asc"
): { key: K[T]; label: string }[] => {
  return list
    .map((item: K) => ({
      key: item[keyName] as K[keyof K] as K[T],
      label: String(item[labelName]),
    }))
    .sort((a, b) => {
      if (order === "asc") {
        return a.label.localeCompare(b.label, "ko-KR");
      } else if (order === "desc") {
        return b.label.localeCompare(a.label, "ko-KR");
      }
      return a.label.localeCompare(b.label, "ko-KR");
    });
};

export const parserForArray = <T extends string | number>(
  list: T[],
  order: "asc" | "desc" = "asc"
): { key: T; label: string }[] => {
  return list
    .map((item) => ({
      key: item,
      label: String(item),
    }))
    .sort((a, b) => {
      if (order === "asc") {
        return a.label.localeCompare(b.label, "ko-KR");
      } else if (order === "desc") {
        return b.label.localeCompare(a.label, "ko-KR");
      }
      return a.label.localeCompare(b.label, "ko-KR");
    });
};

export const parserForObject = <K extends object, T extends keyof K>(
  list: K,
  order: "asc" | "desc" = "asc"
): { key: T; label: string }[] => {
  return Object.entries(list)
    .map(([key, label]) => ({
      key: key as T,
      label: String(label),
    }))
    .sort((a, b) => {
      if (order === "asc") {
        return a.label.localeCompare(b.label, "ko-KR");
      } else if (order === "desc") {
        return b.label.localeCompare(a.label, "ko-KR");
      }
      return a.label.localeCompare(b.label, "ko-KR");
    });
};

export interface DropdownProps<T extends DropdownListType<string | number>>
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "onChange" | "value" | "children"
    >
  > {
  name?: string;
  list: T[];
  value?: T | null;
  labelParser?: (value: string | number) => string | null | undefined;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  labelClassName?: string;
  listClassName?: string;
  emptyLabel?: string;
  addEmpty?: T | undefined;
  labelWrapProps?: SprinklesOmit<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "onChange" | "value" | "children"
    >
  >;
}

const Dropdown = <T extends DropdownListType<string | number>>(
  props: DropdownProps<T>
) => {
  const {
    name,
    disabled,
    readOnly,
    placeholder,
    list,
    className,
    labelParser,
    onChange,
    value,
    labelClassName,
    listClassName,
    labelWrapProps,
    ...rest
  } = props;
  const styles = dropdownStyle;
  const { className: rcn, style, otherProps } = rainbowSprinkles(rest);
  const { otherProps: labelOtherProps } = rainbowSprinkles({
    ...labelWrapProps,
  });
  const [open, set_open] = useState(false);
  const [currentValue, set_currentValue] = useState<T | null>(value ?? null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, Object.keys(list)?.length ?? 0);
  }, [list]);

  useEffect(() => {
    const nextValue =
      // eslint-disable-next-line valid-typeof
      typeof value !== null && typeof value !== "undefined"
        ? list.find((item) => item.key === value?.key) ?? null
        : null;
    set_currentValue(nextValue);
  }, [value, list, labelParser]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        set_open(false);
      }
    }
    if (open && wrapRef.current) {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const setValue = useCallback(
    (item: T) => {
      if (onChange) {
        onChange(item);
      } else {
        set_currentValue(item);
      }
      set_open(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const toggleDropdown = useCallback(() => {
    set_open((prev) => !prev);
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        className={clsx(styles.wrap, className, rcn)}
        style={style}
        {...otherProps}
      >
        <button
          type="button"
          className={clsx(styles.labelWrap, labelClassName)}
          {...labelOtherProps}
          onClick={() => {
            if (disabled || readOnly) return;
            toggleDropdown();
          }}
          disabled={disabled || readOnly}
          tabIndex={0}
          onKeyDown={(e) => {
            if (disabled || readOnly) return;
            if (e.code.includes("Enter") || e.code === "Space") {
              toggleDropdown();
            }
            if (list && list?.length > 0) {
              if (e.key === "ArrowDown") {
                const activeIndex = 0;
                const currentRef = refs.current?.[activeIndex];
                if (currentRef) (currentRef as HTMLButtonElement).focus();
                e.preventDefault();
              } else if (e.key === "ArrowUp") {
                const activeIndex = list.length - 1;
                const currentRef = refs.current?.[activeIndex];
                if (currentRef) (currentRef as HTMLButtonElement).focus();
                e.preventDefault();
              }
            }
          }}
        >
          {currentValue?.icon}
          <span
            className={clsx(styles.label, {
              [styles.placeholder]: !currentValue?.label,
            })}
          >
            {currentValue?.label || placeholder || "선택해주세요"}
          </span>
          <ArrowDown className={clsx({ reverse: open })} />
        </button>
        <div className={clsx(styles.dropdown, { open }, listClassName)}>
          {list.map((item, index) => {
            const { key, label } = item;
            return (
              <button
                type="button"
                ref={(el) => {
                  refs.current[index] = el;
                }}
                key={key}
                tabIndex={0}
                className={clsx(styles.item, {
                  active: key === value?.key || key === currentValue?.key,
                })}
                onClick={() => {
                  setValue(item);
                }}
                disabled={disabled || readOnly}
                onKeyDown={(e) => {
                  if (disabled || readOnly) return;
                  if (e.code.includes("Enter") || e.code === "Space") {
                    setValue(item);
                  }
                  if (list && list?.length > 0) {
                    if (e.key === "ArrowDown") {
                      const activeIndex = (index + 1) % list.length;
                      const currentRef = refs.current?.[activeIndex];
                      if (currentRef) (currentRef as HTMLButtonElement).focus();
                      e.preventDefault();
                    } else if (e.key === "ArrowUp") {
                      const activeIndex =
                        (index + list.length - 1) % list.length;
                      const currentRef = refs.current?.[activeIndex];
                      if (currentRef) (currentRef as HTMLButtonElement).focus();
                      e.preventDefault();
                    }
                  }
                }}
              >
                {item.icon}
                <span>{labelParser ? labelParser(label) ?? label : label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <input name={name} type="hidden" value={value?.key ?? ""} />
    </>
  );
};

export default React.memo(Dropdown) as typeof Dropdown;
