import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { columns } from "@/components/playgrounds/columns";
import { DataTable } from "@/components/playgrounds/data-table";
import { getAllPlaygrounds } from "~/models/playground.server";

export const loader = async () => {
  const playgrounds = await getAllPlaygrounds();
  return json({ playgrounds });
};

export default function ReportIndexPage() {
  const data = useLoaderData<typeof loader>();
  return <DataTable columns={columns} data={data.playgrounds} />;
}
