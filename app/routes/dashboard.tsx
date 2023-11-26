import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import Navigation from "~/components/dashboard/Navigation";

import { useUser } from "~/utils";

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="h-screen w-full bg-white relative flex overflow-hidden">
      <Navigation />

      <div className="w-full h-full flex flex-col justify-between">
        {/* <!-- Header --> */}
        <header className="h-16 w-full flex items-center relative justify-between px-5 space-x-10 bg-gray-800">
          <div className="font-bold text-white text-xl">Playgrounds Hub</div>
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
        <main className="max-w-full h-full flex items-center justify-center relative overflow-y-scroll">
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
