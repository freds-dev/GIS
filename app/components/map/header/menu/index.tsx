import { Link, useNavigation, useSearchParams } from "@remix-run/react";
import {
  Globe,
  LogIn,
  Puzzle,
  Menu as MenuIcon,
  HelpCircle,
  Mail,
  Fingerprint,
  FileLock2,
  Coins,
  Users2,
  ExternalLink,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export default function Menu() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  //   const isLoggingOut = Boolean(navigation.state === "submitting");

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="pointer-events-auto box-border h-10 w-10">
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-gray-100 bg-white text-center text-black hover:bg-gray-100"
          >
            <MenuIcon className="mx-auto h-6 w-6" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 dark:bg-zinc-800 dark:text-zinc-200 dark:opacity-95"
        align="end"
        forceMount
      >
        <div
          className={
            navigation.state === "loading" ? "pointer-events-none" : ""
          }
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Title</p>
              <p className="text-xs leading-none text-muted-foreground">
                Subtitle
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link to="https://docs.sensebox.de/" target="_blank">
              <DropdownMenuItem>
                <Puzzle className="mr-2 h-5 w-5" />
                tutorial{" "}
                <ExternalLink className="ml-auto h-4 w-4 text-gray-300" />
              </DropdownMenuItem>
            </Link>

            <Link to="https://docs.opensensemap.org/" target="_blank">
              <DropdownMenuItem>
                <Globe className="mr-2 h-5 w-5" />
                api <ExternalLink className="ml-auto h-4 w-4 text-gray-300" />
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-5 w-5" />
              fac{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-5 w-5" />
              cióntact{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Fingerprint className="mr-2 h-5 w-5" />
              imprint{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileLock2 className="mr-2 h-5 w-5" />
              data protection{" "}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Coins className="mr-2 inline h-5 w-5" />
                  donate{" "}
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent
                className={"max-h-screen overflow-y-scroll !max-w-[60%]"}
              >
                {/* <Donate /> */}
                <div className="grid grid-cols-2"></div>
              </DialogContent>
            </Dialog>

            <DropdownMenuItem>
              <Users2 className="mr-2 h-5 w-5" />
              <span>dfklgjdg</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link
              to={{
                pathname: "login",
                search: searchParams.toString(),
              }}
              onClick={() => setOpen(false)}
            >
              <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground">
                <LogIn className="mr-2 h-5 w-5" />
                <span className="text-green-100">login</span>
              </button>
            </Link>
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
