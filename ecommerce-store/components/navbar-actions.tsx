"use client";

import { ShoppingCart } from "lucide-react";

import Button from "./ui/button";
import { useEffect, useState } from "react";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center ml-auto gap-x-4">
      <Button className="relative flex items-center rounded-full bg-black px-4 py-2 hover:scale-105 transition">
        <ShoppingCart size={20} />
        <div className="absolute min-w-[20px] rounded-full bg-red-500 top-0 right-[-5px] text-white text-[12px] flex justify-center items-center px-[6px]">
          3
        </div>
      </Button>
    </div>
  );
};

export default NavbarActions;
