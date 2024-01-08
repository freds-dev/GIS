import { Playground } from "@prisma/client";
import { useMatches, useNavigate } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { LandPlot } from "lucide-react";
import { useState } from "react";
import type { MarkerProps } from "react-map-gl";
import { Marker, useMap } from "react-map-gl";
import { cn } from "~/utils/utils";

interface BoxMarkerProps extends MarkerProps {
  playground: Playground;
}

export default function BoxMarker({ playground, ...props }: BoxMarkerProps) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { map: mapRef } = useMap();
  const isFullZoom = mapRef && mapRef?.getZoom() >= 14;

  const isSlected = matches.some(
    (match) => match.params.playgroundId === playground.id,
  );

  const [isHovered, setIsHovered] = useState(false);

  // calculate zIndex based on device status and hover
  const getZIndex = () => {
    if (isHovered) {
      return 30;
    }
    return 20;
  };

  return (
    <Marker
      {...props}
      style={{
        zIndex: getZIndex(),
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          className={cn(
            "group absolute flex w-fit cursor-pointer items-center rounded-full bg-white p-1 text-sm shadow hover:z-10 hover:shadow-lg",
            isFullZoom ? "-left-4 -top-4" : "-left-[10px] -top-[10px]",
          )}
          onClick={() => {
            navigate(`${playground.id}`);
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <span
            className={cn(
              "relative rounded-full transition-colors p-1",
              isSlected ? "bg-green-500" : "bg-white",
            )}
          >
            {<LandPlot className="text-black h-4 w-4" />}
            {isFullZoom ? (
              <div
                className={cn(
                  "absolute left-0 top-0 h-full w-full rounded-full opacity-50",
                  isSlected ? null : "bg-blue-100",
                )}
              />
            ) : null}
          </span>
          {isFullZoom ? (
            <motion.span
              layoutId={playground.id}
              className="text-black max-w-[100px] overflow-hidden overflow-ellipsis whitespace-nowrap px-1 group-hover:max-w-fit group-hover:overflow-auto"
              initial={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -20 }}
            >
              {playground.name}
            </motion.span>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </Marker>
  );
}
