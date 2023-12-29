/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Flag, Info, LandPlot, Users } from "lucide-react";
import { redirect } from "remix-typedjson";
import PlotComponent from "~/components/dashboard/plot";
import { getAllPlaygrounds } from "~/models/playground.server";
import {
  getAllReports,
  getLastReports,
  getReportCountPerDay,
} from "~/models/report.server";
import { getAmountUsers } from "~/models/user.server";
import { getUser } from "~/session.server";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  const plainPlaygrounds = await getAllPlaygrounds();
  const allReports = await getAllReports();
  const amountUsers = await getAmountUsers();
  const reportCountPerDay = await getReportCountPerDay();
  const lastReports = await getLastReports(5);

  if (user?.role !== "ADMIN" || !user) {
    return redirect("/dashboard/playgrounds");
  }
  return {
    user: user,
    plainPlaygrounds: plainPlaygrounds,
    allReports: allReports,
    amountUsers: amountUsers,
    reportCountPerDay: reportCountPerDay,
    lastReports: lastReports,
  };
}

export default function DashboardPage() {
  const data = useLoaderData<typeof loader>();

  const playgroundCount = useMotionValue(0);
  const usersCount = useMotionValue(0);
  const reportsCount = useMotionValue(0);
  const amountPlaygrounds = useTransform(playgroundCount, (latest) =>
    Math.round(latest),
  );
  const amountUsers = useTransform(usersCount, (latest) => Math.round(latest));
  const amountReports = useTransform(reportsCount, (latest) =>
    Math.round(latest),
  );

  useEffect(() => {
    const playgroundControls = animate(
      playgroundCount,
      data.plainPlaygrounds.length,
      {
        duration: 1.5,
      },
    );

    return playgroundControls.stop;
  }, []);

  useEffect(() => {
    const userControls = animate(usersCount, data.amountUsers, {
      duration: 1.5,
    });

    return userControls.stop;
  }, []);

  useEffect(() => {
    const reportControls = animate(reportsCount, data.allReports.length, {
      duration: 1.5,
    });

    return reportControls.stop;
  }, []);

  if (data.user?.role === "ADMIN") {
    return (
      <div className="w-full p-8">
        <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Playgrounds
                </h3>
                <LandPlot />
              </div>
              <div className="p-6 pt-0">
                <motion.div className="text-2xl font-bold">
                  {amountPlaygrounds}
                </motion.div>
                <p className="text-xs text-muted-foreground">
                  Total amount of playgrounds
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Users</h3>
                <Users />
              </div>
              <div className="p-6 pt-0">
                <motion.div className="text-2xl font-bold">
                  {amountUsers}
                </motion.div>
                <p className="text-xs text-muted-foreground">
                  Registered users
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Reports</h3>
                <Flag />
              </div>
              <div className="p-6 pt-0">
                <motion.div className="text-2xl font-bold">
                  {amountReports}
                </motion.div>
                <p className="text-xs text-muted-foreground">
                  Total amount of reports
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
            <div className="flex flex-col space-y-1.5 p-6 pb-0">
              <h3 className="font-semibold leading-none tracking-tight">
                New reports by day
              </h3>
              <p className="text-sm text-muted-foreground">
                New reports over the last 5 days.
              </p>
            </div>
            <div className="">
              <PlotComponent data={data.reportCountPerDay} />
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                Recent Reports
              </h3>
              <p className="text-sm text-muted-foreground">
                You can see the last 5 reports here.
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-8">
                {/* map function to loop through all lastReports and display them */}
                {data.lastReports.map((report: any, key: any) => (
                  <motion.div
                    key={key}
                    initial={{ y: 1000 }} // initial position (off-screen bottom)
                    animate={{ y: 0 }} // animate to y: 0 (on-screen)
                    transition={{ duration: 0.5, delay: key * 0.2 }} // animation duration
                  >
                    <div className="flex items-center">
                      <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
                        <img
                          className="aspect-square h-full w-full"
                          alt="Avatar"
                          src={"/avatars/0" + (key + 1) + ".png"}
                        ></img>
                      </span>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Olivia Martin
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {report.user.email}
                        </p>
                      </div>
                      <Link to={"/dashboard/reports/" + report.id} className="ml-auto font-medium">
                        <Info className="cursor-pointer" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Not allowed</div>;
  }
}
