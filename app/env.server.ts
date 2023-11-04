export function getEnv() {
  return {
    MAPTILER_KEY: process.env.MAPLIBRE_KEY,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  // eslint-disable-next-line no-var
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
