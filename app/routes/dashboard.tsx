import { Form, Link, Outlet } from "@remix-run/react";

import { useUser } from "~/utils";

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Dashboard</Link>
        </h1>
        <p>{user.email ?? ""}</p>
        {user ? (
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        ) : (
          <Link to="login">Login</Link>
        )}
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="playgrounds" className="block p-4 text-xl text-blue-500">
            Playgrounds
          </Link>
          <hr />
          <Link to="reports" className="block p-4 text-xl text-blue-500">
            Reports
          </Link>
          <hr />
          <Link to="settings" className="block p-4 text-xl text-blue-500">
            Settings
          </Link>
          <hr />
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
