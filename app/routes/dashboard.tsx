import {
  Link,
  NavLink,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { Flag, Settings, TableProperties, User } from "lucide-react";

import { useUser } from "~/utils";

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="h-screen w-full bg-white relative flex overflow-hidden">
      {/* <!-- Sidebar --> */}
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        {/* <!-- Profile --> */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <User />
        </NavLink>

        {/* <!-- Playgrounds --> */}
        <NavLink
          to="playgrounds"
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <TableProperties />
        </NavLink>

        {/* <!-- Reports --> */}
        <NavLink
          to="reports"
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <Flag />
        </NavLink>

        {/* <!-- Settings --> */}
        <NavLink
          to="settings"
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <Settings />
        </NavLink>
      </aside>

      <div className="w-full h-full flex flex-col justify-between">
        {/* <!-- Header --> */}
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
          {user ? (
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
              <div className="flex flex-col items-end ">
                <div className="text-md font-medium ">{user.email}</div>
                <div className="text-sm font-regular">{user.role}</div>
              </div>
              <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
            </div>
          ) : (
            <Link to="login">Login</Link>
          )}
        </header>

        {/* <!-- Main --> */}
        <main className="max-w-full h-full flex relative overflow-y-hidden">
          {/* <!-- Outlet --> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
