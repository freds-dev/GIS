/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import {
  GeolocateControl,
  MapLayerMouseEvent,
  MapProvider,
  NavigationControl,
  Map as ReactMap,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import Header from "~/components/map/header";
import {
  getAllPlaygrounds,
  getAllPlaygroundsAsGeoJSON,
} from "~/models/playground.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getFilteredDevices } from "~/utils/utils";
import { getUser } from "~/session.server";
import type Supercluster from "supercluster";
import ClusterLayer from "~/components/map/layers/cluster-layer";

export type PlaygroundClusterProperties =
  | Supercluster.PointFeature<any>
  | Supercluster.PointFeature<
      Supercluster.ClusterProperties & {
        categories: {
          [x: number]: number;
        };
      }
    >;

export async function loader({ request }: LoaderFunctionArgs) {
  const playgrounds = await getAllPlaygroundsAsGeoJSON();
  const plainPlaygrounds = await getAllPlaygrounds();

  //* Get filtered devices if filter params exist in url
  const url = new URL(request.url);
  const urlFilterParams = new URLSearchParams(url.search);
  const filteredPlaygrounds = getFilteredDevices(playgrounds, urlFilterParams);

  const user = await getUser(request);

  return {
    playgrounds: playgrounds,
    plainPlaygrounds: plainPlaygrounds,
    filteredPlaygrounds: filteredPlaygrounds,
    user: user,
  };
}

export default function Explore() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onMapClick = (e: MapLayerMouseEvent) => {
    if (e.features && e.features.length > 0) {
      const feature = e.features[0];

      if (feature.layer.id === "unclustered-point") {
        navigate(`/explore/${feature.properties?.id}`);
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
          // interactiveLayerIds={[
          //   "clusters",
          //   "cluster-count",
          //   "unclustered-point",
          // ]}
          attributionControl={true}
          onClick={onMapClick}
        >
          <ClusterLayer playgrounds={data.playgrounds} />
          <NavigationControl position="bottom-right" showCompass={false} />
          <GeolocateControl position="bottom-right" />
          <Outlet />
        </ReactMap>
      </MapProvider>
    </div>
  );
}
