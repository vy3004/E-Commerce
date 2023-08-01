"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  image: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image
          fill
          src={row.original.image}
          alt=""
          sizes={"80"}
          placeholder="empty"
          className="object-cover object-center"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isArchived ? (
          <div className="bg-green-500 rounded-full px-2 py-1 text-white">
            On
          </div>
        ) : (
          <div className="bg-red-500 rounded-full px-2 py-1 text-white">
            Off
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isFeatured ? (
          <div className="bg-green-500 rounded-full px-2 py-1 text-white">
            On
          </div>
        ) : (
          <div className="bg-red-500 rounded-full px-2 py-1 text-white">
            Off
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
        {row.original.color}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
