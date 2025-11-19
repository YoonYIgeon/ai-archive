import { useSearchParams } from "react-router-dom";
import archives from "../datas/archives.json";
import { parseSearchParamsToJson } from "../utils";

// 모든 원본 이미지
export const totalImages = Object.values(archives).flatMap(
  (archive) => archive.images
);

export default function useGetImages() {
  const [searchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);
  return Object.values(archives).flatMap((archive) => {
    return archive.images.filter((image) => {
console.log('image', image)
      if (!!params.year && params.year !== image.year) {
        return false;
      }

      // if (
      //   params.colors &&
      //   !params.colors.split(",").some((value) => value.trim() === image.color)
      // ) {
      //   return false;
      // }
      if (
        params.shapes &&
        !params.shapes
          .split(",")
          .some((value) => image["Shape Keyword"]?.includes(value.trim()))
      ) {
        return false;
      }

      if (
        params.moods &&
        !params.moods
          .split(",")
          .some((value) => image["Mood Keyword"]?.includes(value.trim()))
      ) {
        return false;
      }

      // if (!params.form || params.form !== image.form) {
      //   return false;
      // }

      // if (!params.emphasis || params.emphasis !== image.emphasis) {
      //   return false;
      // }

      // if (!params.balance || params.balance !== image.balance) {
      //   return false;
      // }

      // if (!params.contrast || params.contrast !== image.contrast) {
      //   return false;
      // }

      // if (!params.whitespace || params.whitespace !== image.whitespace) {
      //   return false;
      // }

      return true;
    });
  });
}
