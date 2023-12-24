"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// const Customer = {
//   TicketId: " ",
//   TextDescription: " ",
//   Question: " ",
//   Answer: " ",
//   AgentName: " ",
//   AgentEmail: " ",
//   CustomerStatus: " ",
//   AgentStatus: " ",
// };

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
    accessorKey: "Ticket_ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Text_Description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Text Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Question",
    header: "Question",
  },
  {
    accessorKey: "Answer",
    header: "Answer",
  },
  {
    accessorKey: "Agent_Name",
    header: "Agent Name",
  },
  {
    accessorKey: "Agent_Email",
    header: "Agent Email",
  },
  {
    accessorKey: "Customer_Satisfaction",
    header: "Customer Satisfaction",
    cell: ({ row }) => {
      const status = row.getValue("Customer_Satisfaction");
      const [action,word] = status.split(' ')
      const color =
        status === "Satisfied"
          ? "bg-green-400"
          : status === "Not Satisfied"
          ? "bg-red-400"
          : "bg-yellow-400"
      return (
        <div className={`${color} text-white text-center p-2 rounded-3xl`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "Agent_Satisfaction",
    header: "Agent Satisfaction",
    cell: ({ row }) => {
      const status = row.getValue("Agent_Satisfaction");
      const [action,word] = status.split(' ')
      const color =
        status === "Successfully Resolved" ? "bg-green-400" : "bg-red-400"
        
      return (
        <div className={`${color} text-white text-center p-2 rounded-3xl`}>
          {status}
        </div>
      );
    },
  },
];
