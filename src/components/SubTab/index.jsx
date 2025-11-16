import clsx from "clsx";
import styles from "./SubTab.module.scss";
import { useSelectedStore } from "../../stores/selectedState";
import { useImageListStore } from "../../stores/imageState";
import useGetImages from "../../hooks/useGetImages";
import { useFilterStore } from "../../stores/filterState";

export default function SubTab() {
  const { shapes, moods } = useSelectedStore();
  const setImageList = useImageListStore((state) => state.setImageList);
  const setTab = useFilterStore((state) => state.setTab);
  const tab = useFilterStore((state) => state.tab || null);
  const images = useGetImages();

  const handleSelectShape = (id, keyword) => {
    const filteredImages = images.filter((image) => {
      return image["Shape Keyword"]?.includes(keyword);
    });
    setImageList(filteredImages);
    setTab("shape", keyword);
  };

  const handleSelectMood = (id, keyword) => {
    const filteredImages = images.filter((image) => {
      return image["Mood Keyword"]?.includes(keyword);
    });
    setImageList(filteredImages);
    setTab("mood", keyword);
  };

  return (
    <ul className={styles.tabList}>
      {shapes?.map((item) => (
        <Item
          key={item.keyword}
          type="shape"
          keyword={item.keyword}
          selected={tab?.value}
          onSelect={handleSelectShape}
        />
      ))}
      {moods?.map((item) => (
        <Item
          type="mood"
          key={item.keyword}
          keyword={item.keyword}
          selected={tab?.value}
          onSelect={handleSelectMood}
        />
      ))}
    </ul>
  );
}

const Item = ({ type, keyword, selected, onSelect }) => {
  return (
    <li key={keyword} className={styles.tabItem}>
      <button
        className={clsx(
          styles.tabButton,
          selected === keyword && styles.selected
        )}
        onClick={() => onSelect(type, keyword)}
      >
        {keyword}
      </button>
    </li>
  );
};
