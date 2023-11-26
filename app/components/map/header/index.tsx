import { useLoaderData } from "@remix-run/react";
import Home from "./home";
import Menu from "./menu";
import NavBar from "./navbar";
import { loader } from "~/routes/explore";

export default function Header() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="items-top pointer-events-none fixed z-10 flex h-14 w-full justify-between gap-4 p-2">
      <Home />
      <NavBar playgrounds={data.plainPlaygrounds} />
      <Menu />
    </div>
  );
}
