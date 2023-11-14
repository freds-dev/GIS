/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import SearchList from "./search-list";

// import SearchList from "./search-list";

interface SearchProps {
  searchString: string;
}

export default function Search(props: SearchProps) {
  const [searchResultsLocation, setSearchResultsLocation] = useState<any[]>([]);
  const [searchResultsDevice, ] = useState<any[]>([]);

  /**
   * One of the functions that is called when the user types in the search bar. It returns the search results for locations, retrived from the mapbox geocode API.
   *
   * @param searchstring string to search for locations on mapbox geocode API
   */
  function getLocations(searchstring: string) {
    const url: URL = new URL("https://api.maptiler.com/geocoding/" + `${searchstring}.json`);

    url.search = new URLSearchParams({
      key: `${ENV.MAPTILER_KEY}`,
      limit: "4",
    }).toString();

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.features.length === 0) {
          setSearchResultsLocation([]);
        } else {
          data.features.forEach((feature: any) => {
            feature.type = "location";
          });
          setSearchResultsLocation(data.features);
        }
      })
      .catch((error) => console.log("error", error));
  }

  /**
   * useEffect hook that is called when the search string changes. It calls the getLocations and getDevices functions to get the search results for locations and devices.
   */
  useEffect(() => {
    if (props.searchString.length >= 2) {
      getLocations(props.searchString);
    }
    if (props.searchString.length < 2) {
      setSearchResultsLocation([]);
    }
  }, [props.searchString]);

  if (searchResultsLocation.length > 0 || searchResultsDevice.length > 0)
    return (
      <div className="mt-2">
        <SearchList
          searchResultsLocation={searchResultsLocation}
        />
        <div className="flex">
          <div className="text-center text-sm text-gray-500">
            <p></p>
          </div>
        </div>
      </div>
    );

  return null;
}
