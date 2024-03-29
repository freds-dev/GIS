import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getReport, deleteReport } from "~/models/report.server";
import { getUserRole, requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.reportId, "reportId not found");
  const userId = await requireUserId(request);
  const report = await getReport({ id: params.reportId });
  const userRole = await getUserRole(request);
  // report does not exist
  if (!report) {
    return redirect("/dashboard/reports");
  }
  // user is not the owner of the report and is not an admin
  if (report.userId !== userId && userRole !== "ADMIN") {
    return redirect("/dashboard/reports");
  }

  return json({ report });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.reportId, "reportId not found");

  await deleteReport({ id: params.reportId, userId });

  return redirect("/dashboard/reports");
};

export default function ReportDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.report.title}</h3>
      <p className="py-6">Description: {data.report.description}</p>
      <p className="py-6">PlaygroundId: {data.report.playgroundId}</p>
      <p className="py-6">Status: {data.report.status}</p>
      <p className="py-6">Created at: {data.report.createdAt}</p>
      <p className="py-6">Updated at: {data.report.updatedAt}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
