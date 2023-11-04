// eslint-disable-next-line import/no-named-as-default
import Map from "react-map-gl/maplibre";

export default function Explore() {
  return (
    <div className="h-full w-full">
      <Map
        initialViewState={{
          longitude: 7.67,
          latitude: 51.988,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={
          "https://api.maptiler.com/maps/streets/style.json?key=" +
          ENV.MAPLIBRE_KEY
        }
      />
    </div>
  );
}
