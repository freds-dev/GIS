import type { User, Report, Playground } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Report } from "@prisma/client";

export function getReport({
  id,
  userId,
}: Pick<Report, "id"> & {
  userId: User["id"];
}) {
  return prisma.report.findFirst({
    where: { id, userId },
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
    select: { id: true, title: true },
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
