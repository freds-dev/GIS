import { Outlet, useLoaderData } from "@remix-run/react";
import {
  GeolocateControl,
  Layer,
  LayerProps,
  MapProvider,
  NavigationControl,
  Map as ReactMap,
  Source,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import Header from "~/components/map/header";
import {
  getAllPlaygrounds,
  getAllPlaygroundsAsGeoJSON,
} from "~/models/playground.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getFilteredDevices } from "~/utils/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const playgrounds = await getAllPlaygroundsAsGeoJSON();
  const plainPlaygrounds = await getAllPlaygrounds();

  //* Get filtered devices if filter params exist in url
  const url = new URL(request.url);
  const urlFilterParams = new URLSearchParams(url.search);
  const filteredPlaygrounds = getFilteredDevices(playgrounds, urlFilterParams);

  return {
    playgrounds: playgrounds,
    plainPlaygrounds: plainPlaygrounds,
    filteredPlaygrounds: filteredPlaygrounds,
  };
}

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export default function Explore() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="">
      <MapProvider>
        <Header />
        <ReactMap
          id="map"
          initialViewState={{
            longitude: 7.67,
            latitude: 51.988,
            zoom: 11,
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
          }}
          mapStyle={
            "https://api.maptiler.com/maps/streets/style.json?key=" +
            ENV.MAPTILER_KEY
          }
          attributionControl={true}
        >
          <Source
            id="my-data"
            type="geojson"
            data={data.filteredPlaygrounds}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
          <NavigationControl position="bottom-right" showCompass={false} />
          <GeolocateControl position="bottom-left" />
          <Outlet />
        </ReactMap>
      </MapProvider>
    </div>
  );
}
