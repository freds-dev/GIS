/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useNavigation } from "@remix-run/react";
import { Check, ChevronUp, Info, Minus, Siren, X } from "lucide-react";
import { useRef, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { typedjson } from "remix-typedjson";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getPlayground } from "~/models/playground.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const playgroundId = params.playgroundId;
  if (!playgroundId) {
    throw new Response("Playground not found", { status: 502 });
  }

  const playground = await getPlayground({ id: playgroundId });

  return typedjson({ playground });
}

export default function ExplorePlaygroundId() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [open, setOpen] = useState(true);
  const nodeRef = useRef(null);
  const [offsetPositionX, setOffsetPositionX] = useState(0);
  const [offsetPositionY, setOffsetPositionY] = useState(0);

  function handleDrag(_e: any, data: DraggableData) {
    setOffsetPositionX(data.x);
    setOffsetPositionY(data.y);
  }

  const minCircleSize = 10; // Adjust this value as needed
  const circleHeight = Math.max(
    minCircleSize,
    Math.floor((data.playground.size / 8000) * 100),
  ).toString();

  return (
    <>
      {open ? (
        <Draggable
          nodeRef={nodeRef}
          defaultPosition={{ x: offsetPositionX, y: offsetPositionY }}
          onDrag={handleDrag}
          bounds="#map"
          handle="#playgroundDetailBoxTop"
        >
          <div
            ref={nodeRef}
            className="absolute bottom-6 left-4 right-4 top-14 z-40 flex flex-row px-4 py-2 md:bottom-[30px] md:left-[10px] md:top-auto md:max-h-[calc(100vh-8rem)] md:w-1/3 md:p-0"
          >
            <div
              id="playgroundDetailBox"
              className={
                "shadow-zinc-800/5 ring-zinc-900/5 relative float-left flex h-full max-h-[calc(100vh-4rem)] w-auto flex-col gap-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 dark:bg-zinc-800 dark:text-zinc-200 dark:opacity-95 dark:ring-white dark:backdrop-blur-sm md:max-h-[calc(100vh-8rem)]"
              }
            >
              {navigation.state === "loading" ? (
                <div className="bg-white/30 dark:bg-zinc-800/30 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                  Loading spinner should be here..
                </div>
              ) : null}
              <div
                id="playgroundDetailBoxTop"
                className="flex w-full cursor-move items-center gap-3 py-2"
              >
                <div className="flex flex-1 text-center text-xl text-zinc-600 dark:dark:text-zinc-100">
                  {data.playground.name}
                </div>
              </div>
              <div className="no-scrollbar relative flex-1 overflow-y-scroll">
                <div className="flex w-full items-center justify-center p-4 opacity-100">
                  <img
                    className="rounded-lg"
                    alt="playground_image"
                    src={"/playground_stock.webp"}
                  ></img>
                </div>
                <div className="flex flex-row justify-between items-center p-4">
                  <div className="flex flex-col items-center justify-center">
                    <p>Soccer</p>
                    {data.playground.ball ? <Check /> : <X />}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>Streetball</p>
                    {data.playground.streetball ? <Check /> : <X />}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p>Skater</p>
                    {data.playground.skater ? <Check /> : <X />}
                  </div>
                </div>
                <div className="p-4 flex items-center justify-around">
                  <div className="relative flex items-center justify-center">
                    <TooltipProvider delayDuration={400}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="w-[100px] h-[100px] bg-blue-100 rounded-full relative z-0"></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Max size: 8000m<sup>2</sup>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={400}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={`bg-blue-600 rounded-full h-[${circleHeight}px] w-[${circleHeight}px] absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1`}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {"Playground size: " + data.playground.size}m
                            <sup>2</sup>
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                <div className="flex items-center justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost">
                          Area
                          <Info className="ml-2 h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {
                            "A = Spielplatz für alle Altersklassen mitzentraler Versorgungsfunktion"
                          }
                          <br />
                          {
                            "B/C = Spielplatz für Kleinkinder sowie schulpfl. Kinder und Jugendliche zur Versorgung eines Wohnbereiches"
                          }
                          <br />
                          {"C = Spielplatz für Kleinkinder"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>{" "}
                  {data.playground.area}
                </div>
                </div>

              </div>
            </div>
            <div className="mx-1">
              <div className="flex flex-col items-center gap-2">
                <div
                  // make the map snap to the initial position and change route to /explore
                  // onClick={() => routeChange("/explore")}
                  className="shadow-zinc-800/5 cursor-pointer rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg hover:brightness-90 dark:bg-zinc-800 dark:text-zinc-200 dark:opacity-90"
                >
                  <X />
                </div>
                <div
                  onClick={() => setOpen(false)}
                  className="shadow-zinc-800/5 cursor-pointer rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg hover:brightness-90 dark:bg-zinc-800 dark:text-zinc-200 dark:opacity-90"
                >
                  <Minus />
                </div>
                <div className="shadow-zinc-800/5 cursor-pointer rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg hover:brightness-90 dark:bg-zinc-800 dark:text-zinc-200 dark:opacity-90">
                  <Link
                    to={`/dashboard/reports/new?playgroundId=${data.playground.id}`}
                  >
                    <Siren />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      ) : (
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="absolute bottom-[10px] left-4 flex cursor-pointer rounded-xl border border-gray-100 bg-white shadow-lg transition-colors duration-300 ease-in-out hover:brightness-90 dark:bg-zinc-800 dark:text-zinc-200 dark:opacity-90 sm:bottom-[30px] sm:left-[10px]"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-4 py-2 ">
                  <ChevronUp />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open device details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
}
