export interface CursorResponse<T> {
  list: T[];
  paging: {
    keyword: string;
    cursor: number | null;
    take: number;
    order: "ASC" | "DESC";
    basis: string;
  };
}

export type ApiResponseType<T> =
  | {
      success: true;
      status: number;
      data: T;
      message?: string;
    }
  | {
      success: false;
      status: number;
      data?: null;
      error: string;
      message: string;
      validation?: {
        [key: string]: string;
      };
    };
