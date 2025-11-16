import archives from "../datas/archives.json";

// 모든 원본 이미지
export const totalImages = Object.values(archives).flatMap(
  (archive) => archive.images
);

export default function useGetImages() {
  return Object.values(archives).flatMap((archive) => archive.images);
}
