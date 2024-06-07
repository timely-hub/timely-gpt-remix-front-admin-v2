import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import "~/styles/global.css";
import "~/styles/layout.css";
import Toast from "./components/Box/Toast";
import AdminManagementLayout from "./layouts/Sidebar";
import ReactQueryClient from "./registry/ReactQueryClient";
import { figmaTheme } from "./styles/vars.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = useLocation().pathname;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={figmaTheme}>
        <Toast />
        <ReactQueryClient>
          {pathname === "/login" ? (
            <div>{children}</div>
          ) : (
            <AdminManagementLayout>{children}</AdminManagementLayout>
          )}
        </ReactQueryClient>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
