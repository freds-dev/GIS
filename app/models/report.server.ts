import type { User, Report, Playground } from "@prisma/client";
import { point } from "@turf/helpers";
import { Point } from "geojson";

import { prisma } from "~/db.server";

export type { Report } from "@prisma/client";

export function getReport({ id }: Pick<Report, "id">) {
  return prisma.report.findFirst({
    where: { id },
  });
}

export function getReportById(id: Report["id"]) {
  return prisma.report.findUnique({
    where: { id },
  });
}

export function getReportListItems({ userId }: { userId: User["id"] }) {
  return prisma.report.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      status: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          email: true,
        },
      },
      playground: {
        select: {
          name: true,
          name2: true,
          size: true,
          type: true,
          description: true,
          area: true,
          ball: true,
          skater: true,
          streetball: true,
          latitude: true,
          longitude: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

// function to get all reports
export function getAllReports() {
  return prisma.report.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          email: true,
        },
      },
      playground: {
        select: {
          name: true,
          name2: true,
          size: true,
          type: true,
          description: true,
          area: true,
          ball: true,
          skater: true,
          streetball: true,
          latitude: true,
          longitude: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createReport({
  description,
  title,
  playgroundId,
  userId,
}: Pick<Report, "description" | "title"> & {
  playgroundId: Playground["id"];
  userId: User["id"];
}) {
  return prisma.report.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
      playground: {
        connect: {
          id: playgroundId,
        },
      },
    },
  });
}

export function deleteReport({
  id,
  userId,
}: Pick<Report, "id"> & { userId: User["id"] }) {
  return prisma.report.deleteMany({
    where: { id, userId },
  });
}

//get last 5 reports with all information
export function getLastReports(amount: number) {
  return prisma.report.findMany({
    take: amount,
    select: {
      id: true,
      title: true,
      description: true,
      user: {
        select: {
          email: true,
        },
      },
      playground: {
        select: {
          name: true,
          name2: true,
          size: true,
          type: true,
          description: true,
          area: true,
          ball: true,
          skater: true,
          streetball: true,
          latitude: true,
          longitude: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

// get amount of reports for each of the last 5 days, seperated by the status attribute
// return array of objects with date and count and sort by date
export async function getReportCountPerDay() {
  const today = new Date();
  const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);

  const reports = await prisma.report.findMany({
    where: {
      createdAt: {
        gte: fiveDaysAgo,
      },
    },
    select: {
      createdAt: true,
      status: true, // Include the 'status' attribute in the selection
    },
  });

  const reportCountPerDay = reports.reduce(
    (acc, report) => {
      const formattedDate = report.createdAt.toISOString().split("T")[0];
      const status = report.status;

      // Initialize the count for the specific date and status if not present
      if (!acc[formattedDate]) {
        acc[formattedDate] = {};
      }

      // Increment the count for the specific date and status
      if (acc[formattedDate][status]) {
        acc[formattedDate][status] += 1;
      } else {
        acc[formattedDate][status] = 1;
      }

      return acc;
    },
    {} as Record<string, Record<string, number>>,
  );

  // Convert the nested structure into an array of objects
  const sortedReportCount = Object.entries(reportCountPerDay)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, counts]) => ({
      date,
      counts,
    }));

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note: months are 0-indexed, so we add 1
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}`;
    return formattedDate;
  }

  // format date key of sortedReportCount
  sortedReportCount.forEach((item) => {
    item.date = formatDate(item.date);
  });

  return sortedReportCount;
}

// get all reports as geojson featurecollection sortet by date
export async function getAllReportsAsGeoJSON() {
  const reports = await prisma.report.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          email: true,
        },
      },
      playground: {
        select: {
          name: true,
          name2: true,
          size: true,
          type: true,
          description: true,
          area: true,
          ball: true,
          skater: true,
          streetball: true,
          latitude: true,
          longitude: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  const geojson: GeoJSON.FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: [],
  };
  for (const report of reports) {
    const coordinates = [
      parseFloat(report.playground.longitude),
      parseFloat(report.playground.latitude),
    ];
    const feature = point(coordinates, report);
    geojson.features.push(feature);
  }
  return geojson;
}
