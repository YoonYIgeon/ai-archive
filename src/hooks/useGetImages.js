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
    return archive.images.filter((image, index) => {
      if (!!params.year && params.year !== image.year) {
        return false;
      }

      if(!index) { console.log(image); }
      
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

      if (
        params.colors &&
        !params.colors.split(",").some((value) =>image.Color.includes(value.trim()))
      ) {
        return false;
      }
      
      if (
        params.forms &&
        !params.forms.split(",").some((value) =>image.Form === value.trim())
      ) {
        return false;
      }

      if (
        params.emphases &&
        !params.emphases.split(",").some((value) =>image.Emphasis === value.trim())
      ) {
        return false;
      }

      if (
        params.balances &&
        !params.balances.split(",").some((value) =>image.Balance === value.trim())
      ) {
        return false;
      }

      if (
        params.contrasts &&
        !params.contrasts.split(",").some((value) =>image.Contrast === value.trim())
      ) {
        return false;
      }

      if (
        params.whitespaces &&
        !params.whitespaces.split(",").some((value) =>image['White space'] === value.trim())
      ) {
        return false;
      }


      return true;
    });
  });
}
