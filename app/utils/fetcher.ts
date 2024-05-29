import { de } from "@faker-js/faker";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getUserToken } from "~/.server/session";
import { ApiResponseType } from "~/types/api";

type FetcherOptions = {
  disableToken?: boolean;
};

type MethodTypes =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

type FetcherConfigs = {
  accessToken?: string;
  pathname?: string;
  spaceDomain?: string;
};
interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

interface ValidationExceptionResponse {
  success: false;
  error: "ValidationException";
  message: {
    property: string;
    message: string;
  }[];
}
interface SuccessResponse<T> {
  success: true;
  error: string;
  message: string;
  data: T;
}

function isValidationExceptionResponse(
  response: ErrorResponse | ValidationExceptionResponse
): response is ValidationExceptionResponse {
  return response.error === "ValidationException";
}

async function handleResponse<T>(response: Response): Promise<T | null> {
  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return (await response.json()) as T;
  } else if (contentType?.includes("text")) {
    return (await response.text()) as T;
  } else if (contentType?.includes("blob") || contentType?.includes("image")) {
    return (await response.blob()) as T;
  } else {
    return null;
  }
}

export const responseParser = async <T = unknown>(
  response: Response
): Promise<ApiResponseType<T>> => {
  if (!response.ok) {
    const errorResponse = (await response.json()) as
      | ErrorResponse
      | ValidationExceptionResponse;
    if (isValidationExceptionResponse(errorResponse)) {
      console.log("errorResponse", errorResponse);
      return {
        success: false,
        status: response.status,
        error: errorResponse.error ?? response.statusText,
        message:
          errorResponse.message?.[0]?.message ??
          errorResponse.error ??
          response.statusText,
        validation: errorResponse.message
          ? errorResponse.message.reduce((acc, cur) => {
              acc[cur.property] = cur.message;
              return acc;
            }, {} as Record<string, string>)
          : undefined,
      };
    }
    return {
      success: false,
      status: 400,
      error: errorResponse.error,
      message:
        errorResponse.message ?? errorResponse.error ?? response.statusText,
    };
  }
  const dataResponse = await handleResponse<SuccessResponse<T>>(response);
  if (!dataResponse?.data)
    return {
      data: dataResponse?.data as T,
      success: true,
      status: 204,
      message: "응답 데이터가 없습니다.",
    };
  return {
    data: dataResponse.data,
    success: true,
    status: response.status,
  };
};

/**
 * ex) fetcher.get('/space')
 * @param input
 * @param init
 * @returns
 */
const fetcherFunction =
  (fetcherConfigs: FetcherConfigs) =>
  async <T = unknown>(
    method: MethodTypes = "GET",
    apiUrl: string | URL | Request,
    init?: RequestInit & {
      configs?: FetcherOptions;
    }
  ): Promise<ApiResponseType<T>> => {
    const { configs, ...restOptions } = init ?? {};
    const baseApiUrl = `${import.meta.env.VITE_API_URL}`;
    let defaultOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!configs?.disableToken) {
      const accessToken =
        fetcherConfigs.accessToken ??
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZjMyMWRiZS1kMTQ3LTRiNGEtYmI1Yi1jNTc4M2JjZDViZTEiLCJybCI6IlJPTEVfQURNSU4iLCJ0IjoiQSIsImlhdCI6MTcxNjc3OTI3NywiZXhwIjoxNzQ4MzE1Mjc3LCJpc3MiOiJ0aW1lbHlncHQifQ.uR51tQpUpSUUu5zDAgShV_WEI5K7OYgCyHTXSTjlaKA";
      defaultOptions.headers = {
        ...defaultOptions.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      console.log(defaultOptions.headers);
    }
    if (restOptions) {
      defaultOptions = {
        ...defaultOptions,
        ...restOptions,
      };
    }
    const url = typeof apiUrl === "string" ? `${baseApiUrl}${apiUrl}` : apiUrl;

    const response = await fetch(url, defaultOptions);
    const data = await responseParser<T>(response);
    return data;
  };

export const fetcher =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("GET", input, init);
fetcher.get = fetcher;
fetcher.post =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("POST", input, init);
fetcher.put =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("PUT", input, init);
fetcher.delete =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("DELETE", input, init);
fetcher.patch =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("PATCH", input, init);
fetcher.options =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("OPTIONS", input, init);
fetcher.head =
  (fetcherConfigs: FetcherConfigs) =>
  <T>(
    input: string | URL | Request,
    init?: RequestInit & { configs?: FetcherOptions }
  ) =>
    fetcherFunction(fetcherConfigs)<T>("HEAD", input, init);

export type { FetcherOptions, MethodTypes };
export default fetcher;

export const loadFetcher = async (
  args: LoaderFunctionArgs | ActionFunctionArgs,
  method?: keyof typeof fetcher
) => {
  const spaceDomain = args.params.spaceDomain;
  const accessToken = await getUserToken(args.request);
  const pathname = new URL(args.request.url).pathname;
  return fetcher[method ?? "get"]({ accessToken, pathname, spaceDomain });
};
