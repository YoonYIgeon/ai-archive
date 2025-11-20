import { useMemo } from "react";
import { totalImages } from "./useGetImages";

export default function useGetFilterDetail(option) {
  // selectedArchive에 따라 직접 이미지 목록 가져오기
  

  const filterDetailData = useMemo(() => {
    const keyMap = {
      shapes: 'Shape Keyword',
      moods: 'Mood Keyword',
      colors: 'Color',
      forms: 'Form',
      emphases: 'Emphasis',
      balances: 'Balance',
      contrasts: 'Contrast',
      whitespaces: 'White space',
    }

    const category = keyMap[option];
    console.log("useGetFilterDetail - Category:", category);

    console.log('totalImages', totalImages);

    if (!category) {
      console.log("useGetFilterDetail - No category found");
      return {};
    }

const result = totalImages.reduce((acc, item) => {
  const {year} = item
  const value = item[category]

  if(!value) return acc;
  if (Array.isArray(value)) {
    value.forEach(v => {
      const value = v.trim()
      if (!acc[year]) acc[year] = {};
      if (!acc[year][value]) acc[year][value] = 0;
      acc[year][value]++;
    })
  } else {
    const trimmedValue = value.trim()
    if (!acc[year]) acc[year] = {};
    if (!acc[year][trimmedValue]) acc[year][trimmedValue] = 0;
    acc[year][trimmedValue]++;
  }
  return acc
}, {});


    // const imageList = totalImages;

    // 카테고리별 처리
    // if (category === "Color") {
    //   result = extractColors(imageList);
    //   console.log("useGetFilterDetail - Color result:", result);
    // } else if (
    //   ["Form", "Contrast", "Balance", "White space", "Emphasis"].includes(
    //     category
    //   )
    // ) {
    //   result = extractSingleValues(imageList, category);
    //   console.log("useGetFilterDetail - Single values result:", result);
    // }

    // console.log("useGetFilterDetail - Final result:", result);
    return result;
  }, [option]);

  return filterDetailData;
}
