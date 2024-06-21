import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node";
import { UserInfoType } from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";

// TODO: production - 도메인 붙으면 수정
export const tokenStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    // httpOnly: true,
    path: "/",
    // sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "shit"],
    // secure: process.env.NODE_ENV === "production",
  },
});
export const userStorage = createCookieSessionStorage({
  cookie: {
    name: "__user",
    // httpOnly: true,
    path: "/",
    // sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "shit"],
    // secure: process.env.NODE_ENV === "production",
  },
});

const TOKEN_SESSION_KEY = "accessToken";

export async function getUser(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const accessToken = await getAccessToken(args.request);
  if (accessToken === undefined) return null;
  const fetcher = await loadFetcher(args);
  const response = await fetcher<UserInfoType>(`/member`);
  return response?.data ?? null;
}

export async function getTokenSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return tokenStorage.getSession(cookie);
}

export async function getAccessToken(
  request: Request
): Promise<string | undefined> {
  const session = await getTokenSession(request);
  const accessToken = session.get(TOKEN_SESSION_KEY);
  return accessToken;
}

export async function requireAccessToken(
  request: Request,
  referer: string = new URL(request.url).pathname,
  redirectUrl: string = "/auth"
) {
  const userId = await getAccessToken(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["referer", referer]]);
    throw redirect(`${redirectUrl}?${searchParams}`);
  }
  return userId;
}

export async function requireUser(
  args: LoaderFunctionArgs | ActionFunctionArgs
) {
  const url = new URL(args.request.url).pathname;
  if (url === "/auth") return null;
  await requireAccessToken(
    args.request,
    new URL(args.request.url).pathname,
    `${args.params.domain ? `/${args.params.domain}` : ""}/auth`
  );
  const user = await getUser(args);
  if (user) return user;
  throw await logout(args.request);
}

export async function createTokenSession({
  request,
  accessToken,
  remember,
  redirectTo,
}: {
  request: Request;
  accessToken: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getTokenSession(request);
  session.set(TOKEN_SESSION_KEY, accessToken);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await tokenStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 365 // 1 year
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getTokenSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await tokenStorage.destroySession(session),
    },
  });
}
