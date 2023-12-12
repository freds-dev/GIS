import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import {
  GeolocateControl,
  Layer,
  LayerProps,
  MapLayerMouseEvent,
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
  source: "playgrounds",
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
  source: "playgrounds",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "symbol", // Change the type to 'symbol'
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-image": "marker", // Specify the icon image
    "icon-size": 1, // Adjust the size of the icon
    "icon-anchor": "bottom", // Adjust the anchor point of the icon
    "text-field": "{title}", // If you have a title property in your data, you can display it as text
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-offset": [0, 0.6], // Adjust the text offset
    "text-anchor": "top", // Adjust the text anchor point
  },
  paint: {
    "icon-color": "#ffffff", // Set the icon color to white
  },
};

export default function Explore() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onMapClick = (e: MapLayerMouseEvent) => {
    if (e.features && e.features.length > 0) {
      const feature = e.features[0];

      if (feature.layer.id === "unclustered-point") {
        navigate(
          `/explore/${feature.properties?.id}`,
        );
      }
    }
  };

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
          interactiveLayerIds={[
            "clusters",
            "cluster-count",
            "unclustered-point",
          ]}
          attributionControl={true}
          onClick={onMapClick}
          onLoad={(e) => {
            const map = e.target;
            map.loadImage("/marker.png", (error, image) => {
              if (error) throw error;
              // Add the image to the map style.
              if (image) {
                map.addImage("marker", image);
              }
            });
          }}
        >
          <Source
            id="playgrounds"
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
          <GeolocateControl position="bottom-right" />
          <Outlet />
        </ReactMap>
      </MapProvider>
    </div>
  );
}
