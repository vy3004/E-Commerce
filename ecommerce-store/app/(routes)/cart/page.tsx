"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

import cart from "@/public/cart-empty.gif";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import CartItem from "./components/cart-item";
import Summary from "./components/summary";

export const revalidate = 0;

const CartPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const items = useCart((state) => state.items);

  const uniqueItems = Array.from(items).filter(
    (item, index) => index === items.findIndex((o) => item.id === o.id)
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {items.length === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="aspect-square relative sm:rounded-lg">
                    <NextImage src={cart} alt="gif" fill className="" />
                  </div>
                  <div className="flex items-center justify-center flex-col space-y-10">
                    <p className="text-neutral-500 text-xl font-bold text-center">
                      Your Cart is Empty!
                    </p>
                    <Button onClick={() => router.push("/")}>
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
              <ul>
                {uniqueItems.map((item) => (
                  <CartItem
                    key={item.id}
                    data={item}
                    quantity={items.filter(({ id }) => id === item.id).length}
                  />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
