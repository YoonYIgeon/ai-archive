import { useMemo } from "react";

import statisticsData from "../datas/statistics.json";
import archivesData from "../datas/archives.json";

export default function useGetFilterDetail(option, selectedArchive) {
  // selectedArchive에 따라 직접 이미지 목록 가져오기
  const imageList = useMemo(() => {
    if (selectedArchive === "all") {
      return Object.values(archivesData).flatMap((archive) => archive.images);
    } else {
      return archivesData[selectedArchive]?.images || [];
    }
  }, [selectedArchive]);

  const filterDetailData = useMemo(() => {
    console.log("useGetFilterDetail - Input:", {
      option,
      selectedArchive,
      imageListLength: imageList?.length,
    });
    console.log("useGetFilterDetail - Sample images:", imageList?.slice(0, 2));

    if (!imageList || imageList.length === 0 || !option) {
      console.log("useGetFilterDetail - Early return: missing data");
      return {};
    }

    if (option === "Shape" || option === "Mood") {
      const result = statisticsData.keyword_ranks[selectedArchive]?.[option];
      console.log("useGetFilterDetail - Shape/Mood result:", result);
      return result;
    }

    // option에 따라 필터링할 카테고리 결정
    const getFilterCategory = (option) => {
      switch (option.toLowerCase()) {
        case "color":
          return "Color";
        case "contrast":
          return "Contrast";
        case "balance":
          return "Balance";
        case "whitespace":
          return "White space";
        case "form":
          return "Form";
        case "emphasis":
          return "Emphasis";
        default:
          return null;
      }
    };

    // 카테고리별 고정 순서 정의
    const getFixedOrder = (category) => {
      const orders = {
        Contrast: ["High", "Medium", "Low"],
        Balance: ["Symmetric", "Asymmetric", "Radial"],
        "White space": ["High", "Medium", "Low"],
        Form: ["2D", "3D", "Photo"],
        Emphasis: ["Center", "Top", "Bottom", "Left", "Right"],
      };
      return orders[category] || [];
    };

    // 단일 값 카테고리 처리 함수 (Form, Contrast, Balance, White space)
    const extractSingleValues = (items, category) => {
      console.log("extractSingleValues - Processing:", {
        category,
        itemsLength: items.length,
      });

      const valueCount = {};
      const yearGroups = {};
      const yearTotals = {}; // 연도별 총 아이템 수

      items.forEach((item) => {
        const year = item.year;
        const value = item[category];

        if (!yearGroups[year]) {
          yearGroups[year] = {};
          yearTotals[year] = 0;
        }

        yearTotals[year]++; // 연도별 총 개수 증가

        if (value) {
          // 전체 카운트
          valueCount[value] = (valueCount[value] || 0) + 1;
          // 연도별 카운트
          yearGroups[year][value] = (yearGroups[year][value] || 0) + 1;
        }
      });

      // 고정 순서 가져오기
      const fixedOrder = getFixedOrder(category);

      // 연도별 정렬된 결과 생성
      const result = {};
      Object.keys(yearGroups).forEach((year) => {
        const yearData = yearGroups[year];
        const totalItems = yearTotals[year];

        // 고정 순서가 있으면 그 순서대로, 없으면 빈도수 순으로
        if (fixedOrder.length > 0) {
          result[year] = fixedOrder.map((keyword) => {
            const frequency = yearData[keyword] || 0;
            const percentage =
              totalItems > 0
                ? ((frequency / totalItems) * 100).toFixed(0)
                : "0.0";
            return {
              keyword,
              frequency: frequency > 0 ? frequency : "None",
              percentage: `${percentage}%`,
            };
          });
        } else {
          result[year] = Object.entries(yearData)
            .map(([keyword, frequency]) => {
              const percentage =
                totalItems > 0
                  ? ((frequency / totalItems) * 100).toFixed(0)
                  : "0.0";
              return {
                keyword,
                frequency,
                percentage: `${percentage}%`,
              };
            })
            .sort(
              (a, b) =>
                (b.frequency === "None" ? 0 : b.frequency) -
                (a.frequency === "None" ? 0 : a.frequency)
            );
        }
      });

      console.log("extractSingleValues - Final result:", result);
      return result;
    };

    // Color 배열 처리 함수
    const extractColors = (items) => {
      const colorCount = {};
      const yearGroups = {};
      const yearColorTotals = {}; // 연도별 총 색상 개수

      // 색상 고정 순서 정의
      const colorOrder = [
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue",
        "Purple",
        "Monochrome",
      ];

      items.forEach((item) => {
        const year = item.year;
        const colors = item.Color;

        if (!yearGroups[year]) {
          yearGroups[year] = {};
          yearColorTotals[year] = 0;
        }

        if (colors && Array.isArray(colors)) {
          colors.forEach((color) => {
            // White와 Black을 Monochrome으로 변환
            const processedColor =
              color === "White" || color === "Black" ? "Monochrome" : color;

            // 전체 카운트
            colorCount[processedColor] = (colorCount[processedColor] || 0) + 1;

            // 연도별 카운트
            yearGroups[year][processedColor] =
              (yearGroups[year][processedColor] || 0) + 1;

            // 연도별 총 색상 개수 증가
            yearColorTotals[year]++;
          });
        }
      });

      // 연도별 정렬된 결과 생성 (고정 순서 적용)
      const result = {};
      Object.keys(yearGroups).forEach((year) => {
        const yearData = yearGroups[year];
        const totalColors = yearColorTotals[year];

        result[year] = colorOrder.map((keyword) => {
          const frequency = yearData[keyword] || 0;
          const percentage =
            totalColors > 0
              ? ((frequency / totalColors) * 100).toFixed(0)
              : "0.0";
          return {
            keyword,
            frequency: frequency > 0 ? frequency : "None",
            percentage: `${percentage}%`,
          };
        }); // 모든 색상을 표시 (None 포함)
      });

      return result;
    };

    const category = getFilterCategory(option);
    console.log("useGetFilterDetail - Category:", category);

    if (!category) {
      console.log("useGetFilterDetail - No category found");
      return {};
    }

    let result = {};

    // 카테고리별 처리
    if (category === "Color") {
      result = extractColors(imageList);
      console.log("useGetFilterDetail - Color result:", result);
    } else if (
      ["Form", "Contrast", "Balance", "White space", "Emphasis"].includes(
        category
      )
    ) {
      result = extractSingleValues(imageList, category);
      console.log("useGetFilterDetail - Single values result:", result);
    }

    console.log("useGetFilterDetail - Final result:", result);
    return result;
  }, [imageList, option, selectedArchive]);

  return filterDetailData;
}
