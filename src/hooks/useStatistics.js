import { useMemo } from "react";
import { useImageListStore } from "../stores/imageState";
import { INITIAL_COLOR_OPTIONS, INITIAL_MAP } from "../constants/config";

export default function useStatistics() {
  const { imageList } = useImageListStore();

  const statistics = useMemo(() => {
    if (!imageList || imageList.length === 0) {
      return {
        year_frequency: [],
        color_frequency: [],
        form_frequency: [],
        emphasis_frequency: [],
        balance_frequency: [],
        contrast_frequency: [],
        white_space_frequency: [],
      };
    }

    // 빈도수 계산 함수
    const calculateYearFrequency = (items, key, resultKey) => {
      const frequencyMap = {};
      items.forEach((item) => {
        const value = item[key];
        if (value) {
          frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        }
      });
      const finalKey = resultKey || key.toLowerCase().replace(/\s+/g, "_");
      return Object.entries(frequencyMap).map(([value, frequency]) => ({
        [finalKey]: value,
        frequency,
      }));
    };

    // 빈도수 계산 함수
    const calculateFrequency = (items, key, resultKey) => {
      let frequencyMap = { ...INITIAL_MAP[resultKey] };
      let totalLength = 0;
      items.forEach((item) => {
        const value = item[key];
        if (value) {
          frequencyMap[value] = (frequencyMap[value] || 0) + 1;
        }
        totalLength++;
      });

      // console.log(key, frequencyMap, totalLength);
      return Object.entries(frequencyMap).map(([keyword, frequency]) => ({
        keyword,
        frequency,
        percentage: frequency / totalLength,
      }));
    };

    // Color 배열 처리 함수 - 각 색상에 1점씩 부여하고 퍼센트 계산
    const calculateColorFrequency = (items) => {
      const colorCount = { ...INITIAL_COLOR_OPTIONS };
      let totalColorPoints = 0;

      // 각 이미지의 Color 배열을 순회하며 색상별 점수 계산
      items.forEach((item) => {
        if (item.Color && Array.isArray(item.Color)) {
          item.Color.forEach((color) => {
            if (color === "White" || color === "Black") {
              colorCount.Monochrome = (colorCount.Monochrome || 0) + 1;
              totalColorPoints += 1;
            } else {
              colorCount[color] = (colorCount[color] || 0) + 1;
              totalColorPoints += 1;
            }
          });
        }
      });

      // 각 색상의 퍼센트 계산
      return Object.entries(colorCount).map(([color, frequency]) => ({
        color: color,
        frequency: frequency,
        percentage:
          totalColorPoints > 0
            ? ((frequency / totalColorPoints) * 100).toFixed(2)
            : 0,
      }));
    };

    // 각 카테고리별 빈도수 계산
    const yearFrequency = calculateYearFrequency(imageList, "year", "year");
    const colorFrequency = calculateColorFrequency(imageList);
    const formFrequency = calculateFrequency(imageList, "Form", "form");
    const emphasisFrequency = calculateFrequency(
      imageList,
      "Emphasis",
      "emphasis"
    );
    const balanceFrequency = calculateFrequency(
      imageList,
      "Balance",
      "balance"
    );
    const contrastFrequency = calculateFrequency(
      imageList,
      "Contrast",
      "contrast"
    );
    const whiteSpaceFrequency = calculateFrequency(
      imageList,
      "White space",
      "white_space"
    );

    return {
      year_frequency: yearFrequency,
      color_frequency: colorFrequency,
      form_frequency: formFrequency,
      emphasis_frequency: emphasisFrequency,
      balance_frequency: balanceFrequency,
      contrast_frequency: contrastFrequency,
      white_space_frequency: whiteSpaceFrequency,
    };
  }, [imageList]);

  return {
    statistics,
  };
}
