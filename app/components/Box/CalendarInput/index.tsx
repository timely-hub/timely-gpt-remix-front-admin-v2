import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
} from "react";
import SvgCalendar from "~/assets/icons/Calendar.svg";
import SvgCaretDown from "~/assets/icons/CaretDown.svg";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { isValidDayjs } from "~/utils/formatter";
import Calendar from "../Calendar";
import calendarInputStyle from "./styles.css";

export interface CalendarInputProps<T extends string | Date | null = string>
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "onChange" | "value" | "disabled" | "readOnly" | "placeholder"
    >
  > {
  value?: T;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: { formatted: string; date: Date; dayJs: Dayjs }) => void;
}

const calendarFormat = "YYYY년 MM월 DD일";
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.match(/\d+/g) || [];
  return `${year}-${month}-${day}`;
}
const CalendarInput = <T extends string | Date | null = string>(
  props: CalendarInputProps<T>,
  ref: React.Ref<HTMLDivElement>
) => {
  const styles = calendarInputStyle;
  const {
    value,
    onChange,
    className,
    disabled,
    readOnly,
    placeholder = `${dayjs().format(calendarFormat)}`,
    ...rest
  } = props;
  const { className: rcn, style, otherProps } = rainbowSprinkles({ ...rest });
  const [openCalendar, setOpenCalendar] = React.useState(false);

  const selectedDate = useMemo(() => {
    const parsedDayjs =
      typeof value === "string"
        ? dayjs(formatDate(value), calendarFormat)
        : typeof value === "object"
        ? dayjs(value)
        : null;
    const disposed = isValidDayjs(parsedDayjs) ? parsedDayjs : null;
    return disposed;
  }, [value]);

  const setSelectedDate = (date: Dayjs) => {
    onChange?.({
      formatted: date.format(calendarFormat),
      date: date.toDate(),
      dayJs: date,
    });
  };
  const toggleCalendar = () => {
    setOpenCalendar((prev) => !prev);
  };
  const wrapRef = useRef<HTMLDivElement>(
    (ref as React.MutableRefObject<HTMLDivElement>)?.current ?? null
  );
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef?.current && !wrapRef.current.contains(event.target as Node)) {
        setOpenCalendar(false);
      }
    }
    if (openCalendar && wrapRef?.current) {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCalendar, ref]);

  return (
    <div
      ref={ref ?? wrapRef}
      style={style}
      className={clsx(styles.wrap, { disabled, readOnly }, className, rcn)}
      {...otherProps}
    >
      <div
        onClick={(e) => {
          if (disabled || readOnly) return;
          e.preventDefault();
          e.stopPropagation();
          toggleCalendar();
        }}
        className={clsx(styles.inner, { placeholder: !selectedDate })}
      >
        <SvgCalendar />
        <span>
          {selectedDate ? selectedDate.format(calendarFormat) : placeholder}{" "}
        </span>
        <SvgCaretDown />
      </div>
      {openCalendar && (
        <div className={styles.calendarBox}>
          <Calendar
            value={selectedDate}
            onClick={(date) => {
              setSelectedDate(date);
              setOpenCalendar(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(
  forwardRef(CalendarInput),
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
) as typeof CalendarInput;
