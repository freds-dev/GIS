/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "@remix-run/react";
import { Flag, Flame, Gauge, Globe, TableProperties } from "lucide-react";

export default function Navigation(props: any) {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
        {/* <!-- Explore --> */}
        <NavLink
          to="/explore"
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <Globe />
        </NavLink>
        {/* <!-- Profile --> */}
        {props.user.role === "ADMIN" ? (
          <>
            <NavLink
              to="/heatmap"
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
                  : isActive
                  ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
                  : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              }
            >
              <Flame />
            </NavLink>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
                  : isActive
                  ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
                  : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              }
            >
              <Gauge />
            </NavLink>
          </>
        ) : null}

        {/* <!-- Playgrounds --> */}
        <NavLink
          to="playgrounds"
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <TableProperties />
        </NavLink>

        {/* <!-- Reports --> */}
        <NavLink
          to="reports"
          className={({ isActive, isPending }) =>
            isPending
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              : isActive
              ? "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear text-gray-800 bg-white"
              : "h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          }
        >
          <Flag />
        </NavLink>
      </aside>
    </>
  );
}
