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
