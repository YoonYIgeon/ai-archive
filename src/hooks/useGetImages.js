import { useSearchParams } from "react-router-dom";
import archives from "../datas/archives.json";

// 모든 원본 이미지
export const totalImages = Object.values(archives).flatMap(
  (archive) => archive.images
);

export default function useGetImages() {
  // 어차피 ALL만 사용한다.
  const [searchParams, setSearchParams] = useSearchParams();

  const year = searchParams.get("year");

  console.log("year :::::", year);

  // const selectedArchive = useFilterStore((state) => state.selectedArchive);

  // let list = [];
  // if (selectedArchive === "all") {
  //   list = Object.values(archives).flatMap((archive) => archive.images);
  // } else {
  //   list = archives[selectedArchive]?.images || [];
  // }

  return Object.values(archives).flatMap((archive) => archive.images);
}
