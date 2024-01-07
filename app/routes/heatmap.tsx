/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "@remix-run/react";
import { Point } from "geojson";
import { useState, useEffect } from "react";
import {
  Source,
  MapProvider,
  Map as ReactMap,
  NavigationControl,
  GeolocateControl,
  Layer,
} from "react-map-gl/maplibre";
import Header from "~/components/map/header";
import ControlPanel from "~/components/map/heatmap/control-panel";
import { heatmapLayer } from "~/components/map/heatmap/map-style";
import { getAllReportsAsGeoJSON } from "~/models/report.server";

export async function loader() {
  const reports = await getAllReportsAsGeoJSON();
  return {
    reports: reports,
  };
}

function filterFeaturesByDay(
  featureCollection: GeoJSON.FeatureCollection<Point>,
  time: any,
) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature: any) => {
    const featureDate = new Date(feature.properties.createdAt);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return {
    type: "FeatureCollection",
    features,
  } as GeoJSON.FeatureCollection<Point>;
}

export default function Heatmap() {
  const loaderData = useLoaderData<typeof loader>();
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState<[number, number]>([0, 0]);
  const [selectedTime, selectTime] = useState<number>(0);
  const [reports] = useState(loaderData.reports);

  useEffect(() => {
    const features = loaderData.reports.features;
    const endTime = features[0].properties?.createdAt;
    const startTime = features[features.length - 1].properties?.createdAt;

    setTimeRange([startTime, endTime]);
    selectTime(endTime);
  }, [loaderData.reports]);

  const filteredReports = allDays
    ? reports
    : filterFeaturesByDay(reports, selectedTime);

  return (
    <div className="">
      <MapProvider>
        <Header />
        <ReactMap
          id="heatmap"
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
        >
          <Source type="geojson" data={filteredReports}>
            <Layer {...heatmapLayer} />
          </Source>
          <NavigationControl position="bottom-right" showCompass={false} />
          <GeolocateControl position="bottom-right" />
        </ReactMap>
        <ControlPanel
          startTime={timeRange[0]}
          endTime={timeRange[1]}
          selectedTime={selectedTime}
          allDays={allDays}
          onChangeTime={selectTime}
          onChangeAllDays={useAllDays}
        />
      </MapProvider>
    </div>
  );
}
