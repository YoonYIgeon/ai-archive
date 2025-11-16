import styles from "./FilterOption.module.scss";
import { ICONS } from "../../constants/config";
import ColorCircle from "../ColorCircle";
import { useFilterStore } from "../../stores/filterState";

export default function FilterOption() {
  const { filterOptions } = useFilterStore();

  return (
    <div className={styles.filterOptions}>
      <span className={styles.filterYear}>{filterOptions?.year}</span>

      {filterOptions?.type &&
        (filterOptions?.type === "shape" || filterOptions?.type === "mood" ? (
          <span className={styles.filterValue}>
            {filterOptions?.value || ""}
          </span>
        ) : filterOptions?.type === "color" ? (
          <ColorCircle size="md" color={filterOptions?.value || ""} />
        ) : (
          <img
            src={ICONS[filterOptions?.type || ""]?.[filterOptions?.value || ""]}
            alt={String(filterOptions?.value).toLowerCase()}
            className={styles.filterIcon}
          />
        ))}
    </div>
  );
}
