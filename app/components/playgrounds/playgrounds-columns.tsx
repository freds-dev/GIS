"use client";

import { Playground } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Info, MoreHorizontal, X } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const columns: ColumnDef<Playground>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("size")}</div>,
  },
  {
    accessorKey: "area",
    header: () => {
      return (
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
        </TooltipProvider>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("area")}</div>,
  },
  {
    accessorKey: "ball",
    header: "Ball",
    cell: ({ row }) => {
      const ball = row.getValue("ball") ? (
        <div className="flex items-center justify-center">
          <Check />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X />
        </div>
      );
      return ball;
    },
  },
  {
    accessorKey: "skater",
    header: "Skater",
    cell: ({ row }) => {
      const skater = row.getValue("skater") ? (
        <div className="flex items-center justify-center">
          <Check />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X />
        </div>
      );
      return skater;
    },
  },
  {
    accessorKey: "streetball",
    header: "Streetball",
    cell: ({ row }) => {
      const streetball = row.getValue("streetball") ? (
        <div className="flex items-center justify-center">
          <Check />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <X />
        </div>
      );
      return streetball;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const playground = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(playground.id)}
            >
              Copy playground ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = "/explore/" + playground.id)
              }
            >
              View playground on explorer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
