/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { Point } from "geojson";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * This function is called in the loader of /explore route. It return list of devices based on user selected filters.

 * @param devices all devices data
 * @param filterParams attributes and selected values
 */
export function getFilteredDevices(
  playgrounds: any,
  filterParams: URLSearchParams,
) {
  // check if any filter is selected
  if (
    filterParams.has("size") ||
    filterParams.has("type") ||
    filterParams.has("ball") ||
    filterParams.has("skate") ||
    filterParams.has("streetball")
  ) {
    // map through all playgrounds and filter based on selected values
    const results = playgrounds.features.filter((playground: any) => {
      // return true if playground is selected
      return (
        (!filterParams.get("size") ||
          parseInt(filterParams.get("size")?.toLowerCase() as string) <
            parseInt(playground.properties.size.toLowerCase())) &&
        (!filterParams.get("streetball") ||
          playground.properties.streetball === true) &&
        (!filterParams.get("skate") || playground.properties.skater === true) &&
        (!filterParams.get("ball") || playground.properties.ball === true)
      );
    });
    // return filtered devices
    return {
      type: "FeatureCollection",
      features: results,
    } as GeoJSON.FeatureCollection<Point>;
  } else {
    // return all devices
    return {
      type: "FeatureCollection",
      features: playgrounds.features,
    } as GeoJSON.FeatureCollection<Point>;
  }
}
