import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getAllPlaygrounds } from "~/models/playground.server";
import { getAllReports } from "~/models/report.server";
import { getAmountUsers } from "~/models/user.server";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const plainPlaygrounds = await getAllPlaygrounds();
  const allReports = await getAllReports();
  const amountUsers = await getAmountUsers();

  return {
    user: user,
    plainPlaygrounds: plainPlaygrounds,
    allReports: allReports,
    amountUsers: amountUsers,
  };
}

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();
  console.log(
    "🚀 ~ file: dashboard._index.tsx:31 ~ DashboardPage ~ data:",
    data,
  );
  if (data.user?.role === "ADMIN") {
    return (
      <div className="w-full px-8">
        <div className="flex w-full items-center justify-evenly py-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Playgrounds</CardTitle>
              <CardDescription>Total amount of playgrounds</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.plainPlaygrounds.length}</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Total amount of reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.allReports.length}</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Total amount of users</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.amountUsers}</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Total amount of users</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.amountUsers}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex w-full items-center justify-evenly py-4">
          <Card className="">
            <CardHeader>
              <CardTitle>Playgrounds</CardTitle>
              <CardDescription>Total amount of playgrounds</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.plainPlaygrounds.length}</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Total amount of reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.allReports.length}</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Total amount of users</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.amountUsers}</p>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Total amount of users</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.amountUsers}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } else {
    return <div>Not allowed</div>;
  }
}
