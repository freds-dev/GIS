import { useLoaderData, useMatches } from "@remix-run/react";
import Home from "./home";
import Menu from "./menu";
import NavBar from "./navbar";
import { loader } from "~/routes/explore";

export default function Header() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();

  return (
    <div className="items-top pointer-events-none fixed z-10 flex h-14 w-full justify-between gap-4 p-2">
      <Home />
      {matches.some((match) => match.pathname === "/heatmap") ? null : (
        <NavBar playgrounds={data.plainPlaygrounds} />
      )}
      <Menu />
    </div>
  );
}
