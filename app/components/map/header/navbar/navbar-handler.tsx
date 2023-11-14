import { Clock4Icon, Cog, Filter } from "lucide-react";

import Search from "~/components/search";
import { cn } from "~/utils/utils";

import useKeyboardNav from "./use-keyboard-nav";

interface NavBarHandlerProps {
  searchString: string;
}

function getSections() {
  return [
    {
      title: "Datum & Zeit",
      icon: Clock4Icon,
      color: "bg-blue-100",
      component: <div>Datum & Zeit</div>,
    },
    {
      title: "Filter",
      icon: Filter,
      color: "bg-gray-300",
      component: <div>Filter</div>,
    },
    {
      title: "Einstellungen",
      icon: Cog,
      color: "bg-green-100",
      component: <div>Einstellungen</div>,
    },
  ];
}

export default function NavbarHandler({ searchString }: NavBarHandlerProps) {
  const sections = getSections();

  const { cursor, setCursor } = useKeyboardNav(0, 0, sections.length);

  if (searchString.length >= 2) {
    return <Search searchString={searchString} />;
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
