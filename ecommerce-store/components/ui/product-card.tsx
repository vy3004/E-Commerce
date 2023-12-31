"use client";

import { Expand, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import IconButton from "./icon-button";
import Currency from "./currency";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const handlePreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    previewModal.onOpen(data);
  };

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 hover:scale-105 transition"
    >
      {/* Image and Action start */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.mainImage}
          fill
          alt="image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={handlePreview}
              icon={<Expand size={20} className="text-gary-600" />}
            />
            <IconButton
              onClick={handleAddToCart}
              icon={<ShoppingCart size={20} className="text-gary-600" />}
            />
          </div>
        </div>
      </div>
      {/* Image and Action end */}

      {/* Description start */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Description end */}

      {/* Price start */}
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
      {/* Price end */}
    </div>
  );
};

export default ProductCard;
