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
import { Checkbox } from "../ui/checkbox";
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const ball = row.getValue("ball") ? <Check /> : <X />;
      return ball;
    },
  },
  {
    accessorKey: "skater",
    header: "Skater",
    cell: ({ row }) => {
      const skater = row.getValue("skater") ? <Check /> : <X />;
      return skater;
    },
  },
  {
    accessorKey: "streetball",
    header: "Streetball",
    cell: ({ row }) => {
      const streetball = row.getValue("streetball") ? <Check /> : <X />;
      return streetball;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
