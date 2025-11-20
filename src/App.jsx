import { useState } from "react";
import styles from "./App.module.scss";
import FilterButton from "./components/FilterButton";
import FilterOption from "./components/FilterOption";
import Header from "./components/Header";
import ImageDetailModal from "./components/ImageDetailModal";
import ImageList from "./components/ImageList";
import Statistics from "./components/Statistics";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };
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
          <Statistics />
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
