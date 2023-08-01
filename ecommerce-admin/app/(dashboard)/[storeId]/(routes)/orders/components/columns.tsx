"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";

export type OrderColumn = {
  id: string;
  name: string;
  phone: string;
  address: string;
  isPaid: boolean;
  paymentMethod: string;
  status: string;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex">
        <div className="text-yellow-500 bg-yellow-100 rounded-lg px-2 py-1">
          {row.original.status}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isPaid ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <XCircle className="text-red-500" />
        )}
      </div>
    ),
  },
];
