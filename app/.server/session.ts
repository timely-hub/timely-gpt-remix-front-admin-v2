import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node";
import { UserInfoType } from "~/types/shared.types";
import { loadFetcher } from "~/utils/fetcher";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET ?? "shit"],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "accessToken";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserToken(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request);
  const accessToken = session.get(USER_SESSION_KEY);
  console.log(accessToken);
  return accessToken;
}

export async function getUser(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const accessToken = await getUserToken(args.request);
  if (accessToken === undefined) return null;
  const fetcher = await loadFetcher(args);
  const response = await fetcher<UserInfoType>(`/auth/me`);
  return response?.data ?? null;
}

export async function requireAccessToken(
  request: Request,
  referer: string = new URL(request.url).pathname,
  redirectUrl: string = "/auth"
) {
  const userId = await getUserToken(request);
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
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, accessToken);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 365 // 1 year
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
