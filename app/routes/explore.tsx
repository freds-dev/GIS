import {
  MapProvider,
  NavigationControl,
  Map as ReactMap,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Explore() {
  return (
    <div className="">
      <MapProvider>
        <ReactMap
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
          <NavigationControl position="top-right" showCompass={false} />
        </ReactMap>
      </MapProvider>
    </div>
  );
}
