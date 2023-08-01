"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "./ui/currency";
import Button from "./ui/button";

import { Product } from "@/types";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";

interface ProductInfoProps {
  data: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
  const cart = useCart();

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-red-500">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6 font-semibold text-black">
        <div>{data?.description}</div>
        <div className="flex items-center gap-x-4">
          <h3>Size:</h3>
          <div className="border-2 border-black rounded-xl px-2 py-1">
            {data?.size?.name}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3>Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={handleAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
