import { useSearchParams } from "react-router-dom";
import { ICONS, REFACT_ICONS } from "../../constants/config";
import { parseSearchParamsToJson } from "../../utils";
import ColorCircle from "../ColorCircle";
import styles from "./FilterOption.module.scss";
import Placeholder from "../Placeholder";

export default function FilterOption() {
  const [searchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);

  const options = Object.entries(params).flatMap(([key, value]) => {
    return value.split(",").map((v) => ({ key, value: v.trim() }));
  });

  return (
    <div className="flex items-center gap-2">
      {options.length === 0 && <Placeholder/>}
      {params.year && <span className="text-[24px] text-white">{params?.year}</span>}
      {options.map((option) => {
        if (option.key === "year") return null;
        if (option.key === "colors")
          return (
            <ColorCircle key={option.value} size="md" color={option.value} />
          );
        if (["shapes", "moods"].includes(option.key))
          return (
            <span
              key={option.value}
              className="text-white border border-white px-2 py-1"
            >
              {option.value}
            </span>
          );
        return (
          <img
            key={option.value}
            src={REFACT_ICONS[option.key || ""]?.[option.value || ""]}
            alt={String(option.value).toLowerCase()}
            className={styles.filterIcon}
          />
        );
      })}
    </div>
  );
}
