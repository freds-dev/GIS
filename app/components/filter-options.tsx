import { useSearchParams, useLoaderData } from "@remix-run/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { loader } from "~/routes/explore";
import { Slider } from "./ui/slider";

export default function FilterOptions() {
  const data = useLoaderData<typeof loader>();
  //* searchParams hook
  const [searchParams, setSearchParams] = useSearchParams();

  //* Set initial filter params based on url Search Params
  const [sizeVal, setSizeVal] = useState(searchParams.get("size") ?? null);

  //* Update filter params based on url Search Params
  useEffect(() => {
    setSizeVal(searchParams.get("size") ?? "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="mt-[8px] space-y-3 px-3 py-[3px] dark:text-zinc-200">
      <div className="space-y-2">
        <div className="space-y-[2px]">
          <Label className="text-base">
            Minimum size in m<sup>2</sup>: {sizeVal}
          </Label>
          &nbsp;
          <Slider
            defaultValue={[parseInt(sizeVal ?? "0")]}
            max={1000}
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
      <div className="flex justify-between">
        <Label className="rounded-[5px] border-[1px] border-[#e2e8f0] px-2 py-[1px] text-base leading-[2.2]">
          Results {data.filteredPlaygrounds.features.length}
        </Label>
        <Button
          variant="outline"
          className=" px-2 py-[1px] text-base rounded-[5px] border-[1px] border-[#e2e8f0]"
          onClick={() => {
            searchParams.delete("size");
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
