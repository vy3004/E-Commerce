import { Product } from "@/types";
import { create } from "zustand";

interface PreviewModalStore {
  data?: Product;
  isOpen: boolean;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  data: undefined,
  isOpen: false,
  onOpen: (data: Product) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
