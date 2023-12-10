/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
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
    filterParams.has("skater") ||
    filterParams.has("streetball")
  ) {
    // map through all playgrounds and filter based on selected values
    const results = playgrounds.features.filter((playground: any) => {
      
      // return true if playground is selected
      return (
        // check if selected values match device attributes
        !filterParams.get("size") ||
        parseInt(filterParams.get("size")?.toLowerCase() as string) <
          parseInt(playground.properties.size.toLowerCase())
      );
    });
    // return filtered devices
    return {
      type: "FeatureCollection",
      features: results,
    };
  } else {
    // return all devices
    return {
      type: "FeatureCollection",
      features: playgrounds.features,
    };
  }
}
