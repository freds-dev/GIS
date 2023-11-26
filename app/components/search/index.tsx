/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import SearchList from "./search-list";
import { Playground } from "@prisma/client";

// import SearchList from "./search-list";

interface SearchProps {
  searchString: string;
  playgrounds: Playground[];
}

export default function Search(props: SearchProps) {
  const [searchResultsLocation, setSearchResultsLocation] = useState<any[]>([]);
  const [searchResultsPlaygrounds, setSearchResultsPlaygrounds] = useState<
    Playground[]
  >([]);

  /**
   * One of the functions that is called when the user types in the search bar. It returns the search results for locations, retrived from the mapbox geocode API.
   *
   * @param searchstring string to search for locations on mapbox geocode API
   */
  function getLocations(searchstring: string) {
    const url: URL = new URL(
      "https://api.maptiler.com/geocoding/" + `${searchstring}.json`,
    );

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
   * One of the functions that is called when the user types in the search bar. It returns the search results for devices, retrived from the device list. The device list is proviided by the database in the /explore route and passed down to the search component.
   *
   * @param searchString string to search for devices in the device list
   */
  function getPlaygrounds(searchString: string) {
    const results: any[] = [];
    let deviceResults = 0;

    for (let index = 0; index < props.playgrounds.length; index++) {
      const playground = props.playgrounds[index];

      if (deviceResults === 4) {
        setSearchResultsPlaygrounds(results);
        return;
      }
      if (
        playground.name.toLowerCase().includes(searchString.toLowerCase()) ||
        playground.id.toLowerCase().includes(searchString.toLowerCase())
      ) {
        const newStructured = {
          display_name: playground.name,
          playgroundId: playground.id,
          lng: playground.longitude,
          lat: playground.latitude,
          type: "playground",
        };
        results.push(newStructured);
        deviceResults++;
        setSearchResultsPlaygrounds(results);
      }
      if (deviceResults === 0) {
        setSearchResultsPlaygrounds([]);
      }
    }
  }

  /**
   * useEffect hook that is called when the search string changes. It calls the getLocations and getDevices functions to get the search results for locations and devices.
   */
  useEffect(() => {
    if (props.searchString.length >= 2) {
      getLocations(props.searchString);
      getPlaygrounds(props.searchString);
    }
    if (props.searchString.length < 2) {
      setSearchResultsLocation([]);
      setSearchResultsPlaygrounds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchString]);

  if (searchResultsLocation.length > 0 || searchResultsPlaygrounds.length > 0)
    return (
      <div className="mt-2">
        <SearchList
          searchResultsLocation={searchResultsLocation}
          searchResultsPlaygrounds={searchResultsPlaygrounds}
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
