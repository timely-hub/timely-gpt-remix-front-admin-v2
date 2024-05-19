import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  useMemo,
} from "react";
import SvgNext from "~/assets/icons/Next.svg";
import SvgNextDouble from "~/assets/icons/NextDouble.svg";
import SvgPrevious from "~/assets/icons/Previous.svg";
import SvgPreviousDouble from "~/assets/icons/PreviousDouble.svg";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { isValidDayjs } from "~/utils/formatter";
import generateCalendar from "~/utils/generateCalendar";
import calendarStyle from "./styles.css";

interface CalendarProps
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "onClick" | "value"
    >
  > {
  value?: Dayjs | null;
  onClick?: (date: Dayjs) => void;
}

const Calendar = (props: CalendarProps, ref: React.Ref<HTMLDivElement>) => {
  const styles = calendarStyle;
  const { className, value, onClick, ...rest } = props;
  const { className: rcn, style, otherProps } = rainbowSprinkles(rest);
  const [currentMonth, setCurrentMonth] = React.useState(dayjs());

  const selectedDate = useMemo(() => {
    setCurrentMonth((prev) => {
      if (isValidDayjs(value) && prev.month() !== value.month()) {
        return value;
      }
      return prev;
    });
    return isValidDayjs(value) ? value : null;
  }, [value]);

  const calendar = useMemo(
    () => generateCalendar(currentMonth, selectedDate ?? dayjs()),
    [currentMonth, selectedDate]
  );
  return (
    <div
      ref={ref}
      className={clsx(styles.wrap, className, rcn)}
      style={style}
      {...otherProps}
    >
      <div className={styles.header}>
        <button
          onClick={() => {
            setCurrentMonth((prev) => prev.subtract(1, "year"));
          }}
        >
          <SvgPreviousDouble />
        </button>
        <div className={styles.headerCenter}>
          <button
            onClick={() => {
              setCurrentMonth((prev) => prev.subtract(1, "month"));
            }}
          >
            <SvgPrevious />
          </button>
          <button
            onClick={() => {
              setCurrentMonth(dayjs());
            }}
          >
            {currentMonth.format("YYYY년 MM월")}
          </button>
          <button
            onClick={() => {
              setCurrentMonth((prev) => prev.add(1, "month"));
            }}
          >
            <SvgNext />
          </button>
        </div>
        <button
          onClick={() => {
            setCurrentMonth((prev) => prev.add(1, "year"));
          }}
        >
          <SvgNextDouble />
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.week}>
          <div className={styles.weekName}>일</div>
          <div className={styles.weekName}>월</div>
          <div className={styles.weekName}>화</div>
          <div className={styles.weekName}>수</div>
          <div className={styles.weekName}>목</div>
          <div className={styles.weekName}>금</div>
          <div className={styles.weekName}>토</div>
        </div>
        <div className={styles.month}>
          {calendar.map((week, weekIndex) => (
            <div key={weekIndex} className={clsx(styles.week)}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={clsx(styles.day, {
                    selected: day.isSelected,
                    today: day.isToday,
                    sunday: dayIndex === 0 && !day.isGrayed,
                    saturday: dayIndex === 6 && !day.isGrayed,
                    grayed: day.isGrayed,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick && onClick(day.current);
                  }}
                >
                  <div className={styles.dayInner}>
                    {day.current.format("D")}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(
  forwardRef(Calendar),
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
) as typeof Calendar;
