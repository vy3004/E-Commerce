"use client";

import Link from "next/link";
import {
  ImageIcon,
  Package,
  Palette,
  PieChart,
  Ruler,
  Settings,
  ShoppingBag,
  Trello,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: "Overview",
      icon: PieChart,
      color: "text-sky-500",
      href: `/${params.storeId}`,
    },
    {
      label: "Orders",
      icon: ShoppingBag,
      color: "text-violet-500",
      href: `/${params.storeId}/orders`,
    },
    {
      label: "Products",
      icon: Package,
      color: "text-pink-700",
      href: `/${params.storeId}/products`,
    },
    {
      label: "Categories",
      icon: Trello,
      color: "text-orange-700",
      href: `/${params.storeId}/categories`,
    },
    {
      label: "Billboards",
      icon: ImageIcon,
      color: "text-emerald-500",
      href: `/${params.storeId}/billboards`,
    },
    {
      label: "Sizes",
      icon: Ruler,
      color: "text-yellow-700",
      href: `/${params.storeId}/sizes`,
    },
    {
      label: "Colors",
      icon: Palette,
      color: "text-green-700",
      href: `/${params.storeId}/colors`,
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className="h-full space-y-4 py-4 flex flex-col border-r">
      <div className="px-3 py-1 flex-1">
        <Link
          href={`/${params.storeId}`}
          className="flex items-center pl-2 pb-4 border-b"
        >
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </Link>
        <div className="space-y-2 mt-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-bold cursor-pointer hover:text-black hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-black bg-black/10 dark:text-white dark:bg-white/10"
                  : "text-gray-600"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
