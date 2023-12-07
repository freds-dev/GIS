import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { LogOut } from "lucide-react";
import { redirect } from "remix-typedjson";
import Navigation from "~/components/dashboard/Navigation";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
  return {
    user: user,
  };
}

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-screen w-full bg-white relative flex overflow-hidden">
      <Navigation user={data.user} />

      <div className="w-full h-full flex flex-col justify-between">
        {/* <!-- Header --> */}
        <header className="h-16 w-full flex items-center relative justify-between px-5 space-x-10 bg-gray-800">
          <div className="font-bold text-white text-xl">Playgrounds Hub</div>
          {data.user ? (
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
              <div className="flex flex-col items-end ">
                <div className="text-md font-medium ">{data.user.email}</div>
                <div className="text-sm font-regular">{data.user.role}</div>
              </div>
              <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="relative flex w-full cursor-pointer select-none items-center"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                </button>
              </Form>
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
