/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { columns } from "~/components/reports/reports-columns";
import { ReportsDataTable } from "~/components/reports/reports-data-table";

import { getAllReports, getReportListItems } from "~/models/report.server";
import { getUserRole, requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const userRole = await getUserRole(request);
  const allReports =
    userRole === "ADMIN"
      ? await getAllReports()
      : await getReportListItems({ userId });
  return json({ allReports });
};

export default function DashboardPlaygroundsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full p-6">
      <Link to="new" className="block p-4 text-xl text-blue-500">
        + New Report
      </Link>

      <hr />
      <ReportsDataTable id="reptable" columns={columns} data={data.allReports} />
    </div>
  );
}
