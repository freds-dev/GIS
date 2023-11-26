/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useSearchParams } from "@remix-run/react";
import { LandPlot, Globe, MapPin } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useMap } from "react-map-gl";

import SearchListItem from "./search-list-item";
import { goTo } from "~/utils/map-helper";
import { Playground } from "@prisma/client";
import useKeyboardNav from "../map/header/navbar/use-keyboard-nav";

interface SearchListProps {
  searchResultsLocation: any[];
  searchResultsPlaygrounds: Playground[];
}

export default function SearchList(props: SearchListProps) {
  const { map } = useMap();
  const navigate = useNavigate();

  const { cursor, setCursor, enterPress, controlPress } = useKeyboardNav(
    0,
    0,
    props.searchResultsPlaygrounds.length + props.searchResultsLocation.length,
  );

  const length =
    props.searchResultsPlaygrounds.length + props.searchResultsLocation.length;
  const searchResultsAll = props.searchResultsPlaygrounds.concat(
    props.searchResultsLocation,
  );

  const [selected, setSelected] = useState(searchResultsAll[cursor]);
  const [searchParams] = useSearchParams();
  const [navigateTo, setNavigateTo] = useState(
    selected.type === "playground"
      ? `/explore/${selected.id}`
      : `/explore${searchParams.size > 0 ? "?" + searchParams.toString() : ""}`,
  );

  const handleNavigate = useCallback(
    (result: any) => {
      return result.type === "playground"
        ? `/explore/${result.playgroundId}`
        : `/explore${
            searchParams.size > 0 ? "?" + searchParams.toString() : ""
          }`;
    },
    [searchParams],
  );

  const handleDigitPress = useCallback(
    (event: any) => {
      if (
        typeof Number(event.key) === "number" &&
        Number(event.key) <= length &&
        controlPress
      ) {
        event.preventDefault();
        setCursor(Number(event.key) - 1);
        goTo(map, searchResultsAll[Number(event.key) - 1]);
        setTimeout(() => {
          navigate(handleNavigate(searchResultsAll[Number(event.key) - 1]));
        }, 500);
      }
    },
    [
      controlPress,
      length,
      navigate,
      map,
      searchResultsAll,
      setCursor,
      handleNavigate,
    ],
  );

  useEffect(() => {
    setSelected(searchResultsAll[cursor]);
  }, [cursor, searchResultsAll]);

  useEffect(() => {
    const navigate = handleNavigate(selected);
    setNavigateTo(navigate);
  }, [selected, handleNavigate]);

  useEffect(() => {
    if (length !== 0 && enterPress) {
      goTo(map, selected);
      navigate(navigateTo);
    }
  }, [enterPress, map, navigate, selected, navigateTo, length]);

  useEffect(() => {
    // attach the event listener
    window.addEventListener("keydown", handleDigitPress);

    // remove the event listener
    return () => {
      window.removeEventListener("keydown", handleDigitPress);
    };
  });

  return (
    <div className="w-full overflow-visible rounded-[1.25rem] bg-white pb-2 text-black dark:bg-zinc-800 dark:opacity-90 dark:text-zinc-200">
      {props.searchResultsPlaygrounds.length > 0 ? (
        <hr className="solid mx-2 mb-2 border-t-2" />
      ) : null}
      {props.searchResultsPlaygrounds.map((playground: any, i) => (
        <SearchListItem
          key={playground.playgroundId}
          index={i}
          active={i === cursor}
          name={playground.display_name}
          icon={LandPlot}
          controlPress={controlPress}
          onMouseEnter={() => setCursor(i)}
          onClick={() => {
            goTo(map, playground);
            navigate(navigateTo);
          }}
        />
      ))}
      {props.searchResultsLocation.length > 0 ? (
        <hr className="solid m-2 border-t-2" />
      ) : null}
      {props.searchResultsLocation.map((location: any, i) => {
        return (
          <SearchListItem
            key={location.id}
            index={i}
            active={i + props.searchResultsPlaygrounds.length === cursor}
            name={location.place_name}
            icon={location.place_type.includes("country") ? Globe : MapPin}
            controlPress={controlPress}
            onMouseEnter={() =>
              setCursor(i + props.searchResultsPlaygrounds.length)
            }
            onClick={() => {
              goTo(map, location);
              navigate(navigateTo);
            }}
          />
        );
      })}
    </div>
  );
}
