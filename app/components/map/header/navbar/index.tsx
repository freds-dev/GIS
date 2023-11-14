import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, XIcon } from "lucide-react";
import { useState, useEffect, useRef, createContext } from "react";

import NavbarHandler from "./navbar-handler";

export const NavbarContext = createContext({
  open: false,
  setOpen: (_open: boolean) => {},
});

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState("");

  // TODO: CLOSE ON CLICK OUTSIDE - NOT WORKING DUES TO MAPBOX GL IMPORT ISSUES
  // const { osem: mapRef } = reactMapGL.useMap();

  // useEffect(() => {
  //   if (mapRef) {
  //     mapRef.on("click", () => setOpen(false));
  //   }
  // }, [mapRef]);

  // register keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevState) => !prevState);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // focus input when opening
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
      setSearchString("");
    }
  }, [open]);

  return (
    <div className="pointer-events-auto relative w-full md:w-1/2">
      <div className="absolute left-0 top-0 w-full rounded-2xl border border-gray-100 bg-white px-2 py-2 shadow-xl md:px-4 dark:bg-zinc-800 dark:opacity-90 dark:backdrop-blur-sm dark:text-zinc-200 dark:ring-white">
        <div className="flex w-full items-center gap-2 px-2 md:gap-4 text-black dark:text-zinc-200">
          <SearchIcon className="aspect-square h-6 dark:text-zinc-200" />
          <input
            ref={inputRef}
            placeholder={"Search for playgrounds"}
            onFocus={() => setOpen(true)}
            onChange={(e) => setSearchString(e.target.value)}
            className="h-fit w-full flex-1 border-none focus:border-none bg-white focus:outline-none focus:ring-0 dark:bg-zinc-800 dark:text-zinc-200"
            value={searchString}
          />
          {!open ? (
            <span className="hidden flex-none text-xs font-semibold text-gray-400 md:block">
              <kbd>ctrl</kbd> + <kbd>K</kbd>
            </span>
          ) : null}
          {open ? (
            <XIcon
              onClick={() => {
                setSearchString("");
                setOpen(false);
                inputRef.current?.blur();
              }}
              className="h-6"
            />
          ) : null}
        </div>
        <NavbarContext.Provider value={{ open, setOpen }}>
          <AnimatePresence>
            {open ? (
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <NavbarHandler searchString={searchString} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </NavbarContext.Provider>
      </div>
    </div>
  );
}
