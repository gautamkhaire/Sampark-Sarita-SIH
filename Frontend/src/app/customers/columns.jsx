"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Customer = {
  id: " ",
  Name: " ",
  Email: " ",
  Phone: " ",
  Gender: " ",
  Datetime: " ",
  Street: " ",
  State: " ",
  Country: " ",
  Status: " ",
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Phone",
    header: "Phone",
  },
  {
    accessorKey: "Gender",
    header: "Gender",
  },
  {
    accessorKey: "Datetime",
    header: "Date  & Time",
    cell: ({ row }) => {
      const date = row.getValue("Datetime");
      const [formattedDate, formattedTime] = date.split(" ");
      return (
        <div>
          {formattedDate}
          <br />
          {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: "Street",
    header: "Street",
  },
  {
    accessorKey: "State",
    header: "State",
  },
  {
    accessorKey: "Country",
    header: "Country",
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("Status");
      const [action,word] = status.split(' ')
      const color =
        status === "Successful Resolution"
          ? "bg-green-400"
          : status === "Unsuccessful Resolution"
          ? "bg-red-400"
          : status === "Partial Resolution"
          ? "bg-yellow-400"
          : "bg-blue-400";
      return (
        <div className={`${color} text-white text-center p-2 rounded-3xl`}>
          {action}
        </div>
      );
    },
  },
];
