import { Link } from "@remix-run/react";

export default function ReportIndexPage() {
  return (
    <p>
      No report selected. Select a report on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new report.
      </Link>
    </p>
  );
}
