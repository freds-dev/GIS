/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  serverDependenciesToBundle: [ "maplibre-gl", "mapbox-gl", "supercluster", "use-supercluster", "react-map-gl"],

  serverModuleFormat: "cjs",
};
