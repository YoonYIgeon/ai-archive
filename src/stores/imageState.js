import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useImageListStore = create(
  devtools((set) => ({
    imageList: [],
    setImageList: (imageList) => set({ imageList }),
  })),
  {
    name: "imageState",
  }
);
