"use client";

import { ShoppingCart } from "lucide-react";

import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex items-center ml-auto gap-x-4">
      <Input type="search" placeholder="Search..." />
      <Button
        onClick={() => router.push("/cart")}
        className="relative flex items-center rounded-full bg-black px-4 py-2 hover:scale-105 transition"
      >
        <ShoppingCart size={20} />
        {cart.items.length > 0 ? (
          <div className="absolute h-[20px] min-w-[20px] rounded-full bg-red-500 top-[-2px] right-[-5px] text-white text-[12px] flex justify-center items-center px-[6px] transition">
            {cart.items.length}
          </div>
        ) : (
          ""
        )}
      </Button>
    </div>
  );
};

export default NavbarActions;
