/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Playground } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Clock, MoreHorizontal } from "lucide-react";

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
    accessorKey: "name", // Use the accessorKey that corresponds to the property in playground
    header: "Playground Name",
    // @ts-ignore
    cell: ({ row }) => <div className="">{row.original.playground.name}</div>,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="">
        {new Date(row.getValue("createdAt")).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("status") === "DONE" ? <Check /> : <Clock />}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original;

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
              onClick={() => navigator.clipboard.writeText(report.id)}
            >
              Copy report ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = "/dashboard/reports/" + report.id)
              }
            >
              View report details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
