import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeItems: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        set({ items: sortByName([...get().items, data]) });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        const indexOfObject = get().items.findIndex((object) => {
          return object.id === id;
        });
        get().items.splice(indexOfObject, 1);
        set({ items: sortByName([...get().items]) });
        toast.success("Item removed from the cart.");
      },
      removeItems: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const sortByName = (arr: Product[]) =>
  arr.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

export default useCart;
