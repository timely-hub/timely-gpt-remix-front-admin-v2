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
