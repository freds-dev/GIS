import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";

import { getReportListItems } from "~/models/report.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const reportListItems = await getReportListItems({ userId });
  return json({ reportListItems });
};

export default function DashboardPlaygroundsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full p-6">
      <Link to="new" className="block p-4 text-xl text-blue-500">
        + New Report
      </Link>

      <hr />
      {data.reportListItems.length === 0 ? (
        <p className="p-4">No reports yet</p>
      ) : (
        <ol>
          {data.reportListItems.map((report) => (
            <li key={report.id}>
              <NavLink
                className={({ isActive }) =>
                  `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                }
                to={report.id}
              >
                📝 {report.title}
              </NavLink>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
