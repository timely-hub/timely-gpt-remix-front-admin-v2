import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export interface GeneratedType {
  current: Dayjs;
  isSelected: boolean;
  isGrayed: boolean;
  isToday: boolean;
  isBefore: boolean;
  isAfter: boolean;
  endBetween: boolean;
  startBetween: boolean;
}

export const isValidDayjs = (date: unknown): date is Dayjs => {
  return dayjs.isDayjs(date) && date.isValid();
};

const generateCalendar = (
  defaultDate: Dayjs,
  selectedDate?: Dayjs,
  comparisonDate?: Dayjs
): GeneratedType[][] => {
  defaultDate = isValidDayjs(defaultDate) ? defaultDate : dayjs();

  const today = dayjs();

  const comparison = isValidDayjs(comparisonDate) ? comparisonDate : null;

  const standardDate = isValidDayjs(selectedDate) ? selectedDate : null;

  const startWeek = defaultDate.clone().startOf("month").week();

  const endWeek =
    defaultDate.clone().endOf("month").week() === 1
      ? 53
      : defaultDate.clone().endOf("month").week();

  const calendar = [];

  for (let week = startWeek; week <= endWeek; week++) {
    calendar.push(
      Array(7)
        .fill(0)
        .map((n, i) => {
          const current: Dayjs = defaultDate
            .clone()
            .week(week)
            .startOf("week")
            .add(n + i, "day");

          const isSelected =
            standardDate?.format("YYYYMMDD") === current.format("YYYYMMDD");

          const isGrayed = current.format("MM") !== defaultDate.format("MM");

          const isToday =
            current.format("YYYYMMDD") === today.format("YYYYMMDD");

          const isAfter = comparison
            ? current.isAfter(comparison, "day")
            : false;

          const isBefore = comparison
            ? current.isBefore(comparison, "day")
            : false;

          const startBetween = Boolean(
            comparison &&
              current.isAfter(standardDate, "day") &&
              current.isBefore(comparison, "day")
          );

          const endBetween = Boolean(
            comparison &&
              current.isAfter(comparison, "day") &&
              current.isBefore(standardDate, "day")
          );

          return {
            current,
            isBefore,
            isAfter,
            isSelected,
            isGrayed,
            isToday,
            endBetween,
            startBetween,
          };
        })
    );
  }
  return calendar;
};
export default generateCalendar;
