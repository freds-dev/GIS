/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSearchParams, useLoaderData } from "@remix-run/react";
import { Dribbble, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { loader } from "~/routes/explore";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";

export default function FilterOptions() {
  const data = useLoaderData<typeof loader>();

  //get max size of all playgrounds where size is a string of each data.plainPOlaygrounds array object
  const maxSize = Math.max(
    ...data.filteredPlaygrounds.features.map(
      (playground: any) => playground.properties.size,
    ),
  );
  console.log("🚀 ~ file: filter-options.tsx:21 ~ FilterOptions ~ maxSize:", maxSize)
  //* searchParams hook
  const [searchParams, setSearchParams] = useSearchParams();

  //* Set initial filter params based on url Search Params
  const [sizeVal, setSizeVal] = useState(searchParams.get("size") ?? null);
  const [streetball, setStreetball] = useState<boolean>(
    searchParams.get("streetball") === "true" ?? false,
  );
  const [ball, setBall] = useState<boolean>(
    searchParams.get("ball") === "true" ?? false,
  );
  const [skate, setSkate] = useState<boolean>(
    searchParams.get("skate") === "true" ?? false,
  );

  //* Update filter params based on url Search Params
  useEffect(() => {
    setSizeVal(searchParams.get("size") ?? "0");
    setStreetball(searchParams.get("streetball") === "true" ?? false);
    setBall(searchParams.get("ball") === "true" ?? false);
    setSkate(searchParams.get("skate") === "true" ?? false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="space-y-3 py-2 px-3 dark:text-zinc-200 flex flex-col justify-between items-stretch h-full">
      <div className="space-y-2">
        <div className="space-y-[2px]">
          <Label className="text-base">
            Minimum area in m<sup>2</sup>: {sizeVal}
          </Label>
          &nbsp;
          <Slider
            defaultValue={[parseInt(sizeVal ?? "0")]}
            max={6100}
            step={100}
            onValueChange={(value) => {
              if (value[0] === 0) {
                searchParams.delete("size");
              } else {
                searchParams.set("size", value[0].toString());
              }
              setSearchParams(searchParams);
            }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="space-y-2">
          <div className="space-y-[2px] flex items-center justify-center flex-col">
            <Label className="text-base">Streetball</Label>
            &nbsp;
            <div>
              <Checkbox
                defaultChecked={streetball}
                onCheckedChange={(value) => {
                  if (value === false) {
                    searchParams.delete("streetball");
                  } else {
                    searchParams.set("streetball", "true");
                  }
                  setSearchParams(searchParams);
                }}
                id="streetball"
              />
              {/* <Dribbble /> */}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="space-y-[2px] flex items-center justify-center flex-col">
            <Label className="text-base">Soccer</Label>
            &nbsp;
            <div>
              <Checkbox
                defaultChecked={ball}
                onCheckedChange={(value) => {
                  if (value === false) {
                    searchParams.delete("ball");
                  } else {
                    searchParams.set("ball", "true");
                  }
                  setSearchParams(searchParams);
                }}
                id="ball"
              />
              {/* <Dribbble /> */}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="space-y-[2px] flex items-center justify-center flex-col">
            <Label className="text-base">Skate</Label>
            &nbsp;
            <div>
              <Checkbox
                defaultChecked={skate}
                onCheckedChange={(value) => {
                  if (value === false) {
                    searchParams.delete("skate");
                  } else {
                    searchParams.set("skate", "true");
                  }
                  setSearchParams(searchParams);
                }}
                id="skate"
              />
              {/* <Dribbble /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Label className="rounded-[5px] border-[1px] border-[#e2e8f0] px-2 py-[1px] text-base leading-[2.2]">
          Results {data.filteredPlaygrounds.features.length}
        </Label>
        <Button
          variant="outline"
          className=" px-2 py-[1px] text-base rounded-[5px] border-[1px] border-[#e2e8f0]"
          onClick={() => {
            searchParams.delete("size");
            searchParams.delete("streetball");
            searchParams.delete("ball");
            searchParams.delete("skate");
            setSearchParams(searchParams);
          }}
        >
          <span>
            <X className=" m-0 inline h-3.5 w-3.5 p-0 align-sub" /> Reset
            filters
          </span>
        </Button>
      </div>
    </div>
  );
}
