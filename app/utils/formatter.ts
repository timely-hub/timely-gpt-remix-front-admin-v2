import dayjs, { Dayjs } from "dayjs";
import { handleNumberString } from "./helpers";

export const phoneMaskFormatter = (phone: string | null) => {
  return phone && phone?.length < 11
    ? phone.startsWith("02")
      ? phone?.length < 10
        ? "##-###-#####"
        : "##-####-####" // 서울 지역번호
      : "###-###-#####"
    : "###-####-####";
};

export const numberThousands = (
  num?: number | string | null,
  options?: Intl.NumberFormatOptions | undefined
) => {
  if (num === undefined || num === null) return "0";
  if (typeof num === "string") num = handleNumberString(num, 0);
  return new Intl.NumberFormat("ko-KR", options).format(num);
};

export const isValidDayjs = (date: unknown): date is Dayjs => {
  return dayjs.isDayjs(date) && (date as Dayjs).isValid();
};

export const dayJsFormatter = (
  date: Date | string | null | undefined | number,
  configs: {
    format?: string;
    defaultValue?: string;
  } = {
    format: "YYYY-MM-DD",
    defaultValue: "",
  }
) => {
  return isValidDayjs(dayjs(date))
    ? dayjs(date).locale("ko").format(configs.format)
    : configs.defaultValue;
};
