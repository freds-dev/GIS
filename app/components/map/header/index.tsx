import Home from "./home";
import Menu from "./menu";
import NavBar from "./navbar";

export default function Header() {
  return (
    <div className="items-top pointer-events-none fixed z-10 flex h-14 w-full justify-between gap-4 p-2">
      <Home />
      <NavBar />
      <Menu />
    </div>
  );
}
