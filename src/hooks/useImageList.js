import { useEffect } from "react";
import { useFilterStore } from "../stores/filterState";
import { FILTER_OPTIONS } from "../constants/config";
import { useImageListStore } from "../stores/imageState";
import useGetImages from "./useGetImages";

export default function useImageList() {
  const { filterOptions, tab } = useFilterStore();
  const { setImageList } = useImageListStore();
  const images = useGetImages();

  useEffect(() => {
    let list = [...images];

    if (tab) {
      if (tab.type === "shape") {
        list = list.filter((image) => {
          return image["Shape Keyword"]?.includes(tab.value);
        });
      } else if (tab.type === "mood") {
        list = list.filter((image) => {
          return image["Mood Keyword"]?.includes(tab.value);
        });
      }
    }

    // 5. Filter Options 필터링
    if (filterOptions.type && filterOptions.value) {
      // 2. Shape Keyword 필터링
      if (filterOptions.type === "shape") {
        list = list.filter((image) => {
          return image["Shape Keyword"]?.includes(filterOptions.value);
        });
      } else if (filterOptions.type === "mood") {
        // 3. Mood Keyword 필터링
        list = list.filter((image) => {
          return image["Mood Keyword"]?.includes(filterOptions.value);
        });
      } else if (filterOptions.type === "color") {
        // 4. Color 필터링
        list = list.filter((image) => {
          return image["Color"]?.includes(filterOptions.value);
        });
      } else {
        list = list.filter((image) => {
          return (
            image[FILTER_OPTIONS[filterOptions.type]] === filterOptions.value
          );
        });
      }
      setImageList(list);
    }
    if (filterOptions.year !== "ALL" && filterOptions.year) {
      list = list.filter((image) => {
        return image.year === filterOptions.year;
      });
      setImageList(list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions, setImageList]);
}
