import Image from "next/image";
import { X } from "lucide-react";
import { MouseEventHandler } from "react";

import { Product } from "@/types";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

interface CartItemProps {
  data: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ data, quantity }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItems(data.id);
  };

  const moreOfThisProduct = () => {
    cart.addItem(data);
  };

  const lessOfThisProduct = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.mainImage}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>

          <div className="text-gray-400">
            <Currency value={data.price} />
          </div>

          <div></div>

          <div className="space-x-2">
            <button
              onClick={lessOfThisProduct}
              className="h-8 w-8 border border-black rounded-lg"
            >
              -
            </button>
            <span className="h-8 w-8 font-bold">{quantity}</span>

            <button
              onClick={moreOfThisProduct}
              className="h-8 w-8 border border-black rounded-lg"
            >
              +
            </button>
          </div>

          <div className="text-red-500 text-lg mt-4">
            <Currency value={quantity * parseFloat(data.price)} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
