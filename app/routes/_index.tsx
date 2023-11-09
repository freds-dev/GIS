import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Sprout, Map } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <div className="leading-normal tracking-normal max-h-screen px-8 pb-14 bg-right bg-cover">
      {/* <!--Nav--> */}
      <div className="w-full container mx-auto p-6">
        <div className="w-full flex items-center justify-between">
          <Link
            to={"/"}
            className="flex items-center text-indigo-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <Sprout className="fill-current text-indigo-600 pr-2" />
            PLAYGROUNDS
          </Link>

          <div className="flex w-1/2 justify-end content-center">
            <Link
              to={"/explore"}
              data-tippy-content="@twitter_handle"
              className="inline-block text-indigo-600 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
            >
              <div className="flex items-center justify-center hover:text-indigo-800 text-indigo-60">
                Explore
                <Map className="pl-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* <!--Main--> */}
      <div className="container pt-24 md:pt-32 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center bg-[url('/bg.svg')]">
        <div className="flex flex-nowrap">
          {/* <!--Left Col--> */}
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-3xl md:text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
              Playgrounds Hub: Your Neighborhood, Your Play Space!{" "}
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
              Explore local play areas and build community bonds.
            </p>
            {user ? (
              <div className="flex w-full justify-around pb-24 lg:pb-0 fade-in">
                <Button className="bounce-top-icons items-center justify-center rounded-md bg-purple-800 text-white">
                  <Link to="/reports">View Reports for {user.email}</Link>
                </Button>
              </div>
            ) : (
              <div className="flex w-full justify-around pb-24 lg:pb-0 fade-in">
                <Button className="bounce-top-icons items-center justify-center rounded-md bg-purple-800 text-white">
                  <Link to="/join">Sign Up</Link>
                </Button>
                <Button className="bounce-top-icons items-center justify-center rounded-md bg-purple-800 text-white">
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            )}
          </div>

          {/* <!--Right Col--> */}
          <div className="w-full xl:w-3/5 py-6 overflow-y-hidden">
            <img
              alt="devices.svg"
              className="w-5/6 mx-auto lg:mr-0 slide-in-bottom rounded-xl"
              src="/playground_sketch.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
