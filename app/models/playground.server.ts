import type { Playground } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Playground } from "@prisma/client";

export async function createPlayground(
  id: Playground["id"],
  name: Playground["name"],
  name2: Playground["name2"],
  size: Playground["size"],
  type: Playground["type"],
  description: Playground["description"],
  area: Playground["area"],
  ball: Playground["ball"],
  skater: Playground["skater"],
  streetball: Playground["streetball"],
  latitude: Playground["latitude"],
  longitude: Playground["longitude"],
) {
  return prisma.playground.create({
    data: {
      id,
      name,
      name2,
      size,
      type,
      description,
      area,
      ball,
      skater,
      streetball,
      latitude,
      longitude,
    },
  });
}
