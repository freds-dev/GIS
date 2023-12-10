/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Clock4Icon, Cog, Filter } from "lucide-react";

import Search from "~/components/search";
import { cn } from "~/utils/utils";

import useKeyboardNav from "./use-keyboard-nav";
import { Playground } from "@prisma/client";
import FilterOptions from "~/components/filter-options";

interface NavBarHandlerProps {
  searchString: string;
  playgrounds: Playground[];
}

function getSections() {
  return [
    {
      title: "Size & Location",
      icon: Clock4Icon,
      color: "bg-blue-600",
      component: <FilterOptions />,
    },
    {
      title: "Area",
      icon: Filter,
      color: "bg-gray-600",
      component: <div>Area</div>,
    },
    {
      title: "Settings",
      icon: Cog,
      color: "bg-green-600",
      component: <div>Settings</div>,
    },
  ];
}

export default function NavbarHandler({
  searchString,
  playgrounds,
}: NavBarHandlerProps) {
  const sections = getSections();

  const { cursor, setCursor } = useKeyboardNav(0, 0, sections.length);

  if (searchString.length >= 2) {
    return <Search playgrounds={playgrounds} searchString={searchString} />;
  }

  return (
    <div className="mt-4 flex h-60 flex-col gap-4 md:flex-row">
      <div className="flex justify-around gap-2 md:h-full md:flex-1 md:flex-col">
        {sections.map((section, index) => (
          <div
            key={index}
            className={cn(
              `flex cursor-pointer items-center gap-4 rounded-full px-4 py-1 text-white hover:shadow-lg`,
              section.color,
              // disabled for now because ring looked weird
              // cursor === index && "ring-2 ring-slate-200 ring-offset-2"
            )}
            onClick={() => {
              setCursor(index);
            }}
          >
            <section.icon className="h-4 w-4" />
            <span className="hidden md:block">{section.title}</span>
          </div>
        ))}
      </div>
      <div className="flex-1">{sections[cursor].component}</div>
    </div>
  );
}
