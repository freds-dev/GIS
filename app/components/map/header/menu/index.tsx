/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Form,
  Link,
  useNavigation,
  useSearchParams,
  useLoaderData,
} from "@remix-run/react";
import type { loader } from "~/routes/explore";
import { useEffect, useRef, useState } from "react";
import {
  LogIn,
  LogOut,
  Menu as MenuIcon,
  HelpCircle,
  Fingerprint,
  User2,
  Gauge,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "~/components/ui/use-toast";

export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export default function Menu() {
  const [searchParams] = useSearchParams();
  const redirectTo =
    searchParams.size > 0 ? "/explore?" + searchParams.toString() : "/explore";
  const data = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigation = useNavigation();
  const isLoggingOut = Boolean(navigation.state === "submitting");
  const [timeToToast, setTimeToToast] = useState<Boolean>(false);

  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender && !timeToToast) {
      setTimeToToast(true);
    } else if (!firstRender && timeToToast) {
      if (data.user === null) {
        toast({
          description: "logout successful",
        });
      }
      if (data.user !== null) {
        const creationDate = Date.parse(data.user.createdAt);
        const now = Date.now();
        const diff = now - creationDate;
        if (diff < 10000) {
          toast({
            description: "login successful",
          });
          setTimeout(() => {
            toast({
              description: "login successful",
            });
          }, 100);
        } else {
          toast({
            description: "login successful",
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.user, toast, firstRender]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="pointer-events-auto box-border h-10 w-10">
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-gray-100 bg-white text-center text-black hover:bg-gray-100"
          >
            {data.user === null ? (
              <MenuIcon className="mx-auto h-6 w-6" />
            ) : (
              <User2 className="mx-auto h-6 w-6" />
            )}
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
          {data.user === null ? null : (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Max Mustermann
                    {/* {data.user.name} */}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {data.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to={"/dashboard"} className="flex">
                <Gauge className="mr-2 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/faq"} className="flex">
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>FAQ</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/imprint"} className="flex">
                <Fingerprint className="mr-2 h-5 w-5" />
                <span>Imprint</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {data.user === null ? (
              <Link
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
                onClick={() => setOpen(false)}
              >
                <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground">
                  <LogIn className="mr-2 h-5 w-5" />
                  <span className="text-green-600">Login</span>
                </button>
              </Link>
            ) : (
              <Form
                action="/logout"
                method="post"
                onSubmit={() => {
                  setOpen(false);
                  // toast({
                  //   description: "Logging out ...",
                  // });
                }}
              >
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <button
                  type="submit"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground"
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span className="text-red-500">Logout</span>
                </button>
              </Form>
            )}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
