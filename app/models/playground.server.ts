import type { Playground } from "@prisma/client";
import { point } from "@turf/helpers";
import type { Point } from "geojson";

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

export async function getAllPlaygrounds() {
  const playgrounds = await prisma.playground.findMany();
  const geojson: GeoJSON.FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: [],
  };
  for (const playground of playgrounds) {
    const coordinates = [
      parseFloat(playground.longitude),
      parseFloat(playground.latitude),
    ];
    const feature = point(coordinates, playground);
    geojson.features.push(feature);
  }
  return geojson;
}

export function getPlayground({ id }: Pick<Playground, "id">) {
  return prisma.playground.findFirst({
    where: { id },
  });
}
