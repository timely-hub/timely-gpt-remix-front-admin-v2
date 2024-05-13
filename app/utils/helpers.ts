/**
 * 숫자(정수)로 반환해주는 함수
 * @param value 숫자여야 하는 값
 * @param defaultValue 숫자가 될수 없을때 반환할 값
 * @returns any
 */
export const handleNumberString = <T>(
  value: string | number | undefined | null,
  defaultValue: T
) => {
  if (value === undefined || value === null) return defaultValue;
  return isNaN(Number(value)) || !isFinite(Number(value))
    ? defaultValue
    : Math.abs(Number(value));
};

/**
 * 아래 세개는 Object변환시 타입을 유지하기 위한 함수들
 * @param obj
 * @returns
 */
export const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};
export const objectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
};
export const objectValues = <T extends object>(obj: T) => {
  return Object.values(obj) as T[keyof T][];
};

/**
 * 요거는 URLSearchParams를 기본값(객체)에 값을 넣어주는 함수
 * @param searchParams
 * @param params
 * @returns
 */
export function getQueryParams<T extends Record<string, string>>(
  searchParams: URLSearchParams,
  params: T
) {
  const obj = JSON.parse(JSON.stringify(params));
  Object.keys(obj).forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      obj[key as keyof T] = value as T[keyof T];
    }
  });
  return obj as T;
}

/**
 * 요거는 URLSearchParams를 기본값(객체)에 값을 넣어주는 함수
 * @param searchParams
 * @param params
 * @returns
 */
export function getObjectParams<T extends Record<string, string>>(
  searchParams: Partial<T>,
  params: T
) {
  const obj = JSON.parse(JSON.stringify(params));
  Object.keys(obj).forEach((key) => {
    const value = searchParams[key];
    if (value) {
      obj[key as keyof T] = value as T[keyof T];
    }
  });
  return obj as T;
}

/**
 * 이거는~ 객체를 query string으로 변환해주는 함수
 * @param params
 * @returns
 */
export function objectToQueryParams<
  T extends Record<string | number, string | number>
>(params: T) {
  return Object.keys(params)
    .map((key) =>
      params[key as keyof T] ? `${key}=${params[key as keyof T]}` : null
    )
    .filter(Boolean)
    .join("&");
}

/**
 * 기본값에 없는 키를 제거함
 * @param original 기본값(키)을 가진 객체
 * @param paramsObject props로 받은 searchParams객체
 * @returns
 */
export function omitUnusedSearchParams<
  T extends Record<string | number, string | number>
>(original: T, paramsObject: Record<string | number, string | number>) {
  const result = {} as T;
  for (const key in original) {
    if (key in paramsObject && !!paramsObject[key]) {
      result[key] = paramsObject[key] as T[Extract<keyof T, string>];
    } else {
      result[key] = original[key];
    }
  }
  return result;
}
export function calculateAge(birthday?: string | null): number {
  if (!birthday) return 0;
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/** 천단위 쉼표 */
export const thousand = (num?: number | string, decimalCount?: number) => {
  if (!num || !Number(num)) num = 0;
  if (typeof num === "string") num = Number(num);
  if (decimalCount !== undefined) num = Number(num.toFixed(decimalCount));
  return new Intl.NumberFormat("ko-KR").format(num);
};
