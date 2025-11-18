import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import FilterButton from "./components/FilterButton";
import FilterOption from "./components/FilterOption";
import Header from "./components/Header";
import ImageDetailModal from "./components/ImageDetailModal";
import ImageList from "./components/ImageList";
import Statistics from "./components/Statistics";
import SubTab from "./components/SubTab";
import useStatistics from "./hooks/useStatistics";
import { useFilterStore } from "./stores/filterState";
import { useNavigate, useSearchParams } from "react-router-dom";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { mode, setFilterOptions } = useFilterStore();
  const { statistics } = useStatistics();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  // useEffect(() => {
  //   if (
  //     (!searchParams.get("year") &&
  //       statistics &&
  //       !statistics.top_shape_keyword) ||
  //     (statistics.top_shape_keyword?.length === 0 &&
  //       !statistics.top_mood_keyword) ||
  //     statistics.top_mood_keyword?.length === 0
  //   ) {
  //     setSearchParams({ year: "ALL" });
  //   }
  // }, [statistics, setSearchParams, searchParams]);

  const year = searchParams.get("year");

  useEffect(() => {
    // 초기화 이후 로직
    setFilterOptions({ year, type: null, value: null });
  }, [year, setFilterOptions]);

  return (
    <div className={"flex flex-col"}>
      {/* 최상위 헤더 */}
      <Header hasBorder />
      <div className="flex items-stretch">
        <div className={"flex flex-col flex-1 flex-grow-1"}>
          <div className="flex justify-between items-center py-3 px-4">
            <FilterOption />
            <FilterButton />
          </div>
          <ImageList onSelect={handleSelectImage} />
        </div>
        <div className={styles.sidebar}>
          <Statistics statistics={statistics} />
          {selectedImage && (
            <ImageDetailModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
