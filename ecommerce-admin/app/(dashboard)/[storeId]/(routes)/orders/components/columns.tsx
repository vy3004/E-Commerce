"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";

import { CellAction } from "./cell-action";

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

const statuses = [
  { name: "Pending", color: "text-yellow-500 bg-yellow-100" },
  { name: "Delivery", color: "text-blue-500 bg-blue-100" },
  { name: "Completed", color: "text-green-500 bg-green-100" },
  { name: "Canceled", color: "text-red-500 bg-red-100" },
];

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
    cell: ({ row }) => (
      <div className="w-40 truncate">{row.original.address}</div>
    ),
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
        <div
          className={`"font-semibold rounded-lg px-2 py-1" ${
            statuses.find(({ name }) => name === row.original.status)?.color
          }`}
        >
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
