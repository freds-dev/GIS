import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { columns } from "~/components/playgrounds/playgrounds-columns";
import { DataTable } from "~/components/playgrounds/playgrounds-data-table";
import { getAllPlaygrounds } from "~/models/playground.server";

export const loader = async () => {
  const playgrounds = await getAllPlaygrounds();
  return json({ playgrounds });
};

export default function DashboardPlaygroundsPage() {
  const data = useLoaderData<typeof loader>();
  return <div className="w-full h-full p-6"><DataTable columns={columns} data={data.playgrounds} /></div>;
}
