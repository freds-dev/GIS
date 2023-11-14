import { useMatches, useNavigate, useSearchParams } from "@remix-run/react";
import { Cpu, Globe, MapPin } from "lucide-react";
import { useState, useEffect, useCallback, useContext } from "react";
// import { useMap } from "react-map-gl";

import SearchListItem from "./search-list-item";

interface SearchListProps {
  searchResultsLocation: any[];
}

export default function SearchList(props: SearchListProps) {
//   const { osem } = useMap();
  const navigate = useNavigate();
  const matches = useMatches();

  const length = props.searchResultsLocation.length;
  const searchResultsAll = props.searchResultsLocation;
  const [searchParams] = useSearchParams();

  return (
    <div className="w-full overflow-visible rounded-[1.25rem] bg-white pb-2 text-black dark:bg-zinc-800 dark:opacity-90 dark:text-zinc-200">
      {props.searchResultsLocation.length > 0 ? (
        <hr className="solid m-2 border-t-2" />
      ) : null}
      {props.searchResultsLocation.map((location: any, i) => {
        return (
          <SearchListItem
            key={location.id}
            index={i}
            active={true}
            name={location.place_name}
            icon={location.place_type.includes("country") ? Globe : MapPin}
            controlPress={true}
            onMouseEnter={() => console.log("mouse enter")}
            onClick={() => {
              //   goTo(osem, location);
              //   setShowSearchCallback(false);
              //   navigate(navigateTo);
            }}
          />
        );
      })}
    </div>
  );
}
