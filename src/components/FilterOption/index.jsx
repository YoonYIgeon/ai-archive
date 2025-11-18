import { useSearchParams } from "react-router-dom";
import { ICONS, REFACT_ICONS } from "../../constants/config";
import { parseSearchParamsToJson } from "../../utils";
import ColorCircle from "../ColorCircle";
import styles from "./FilterOption.module.scss";

export default function FilterOption() {
  const [searchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);

  const options = Object.entries(params).flatMap(([key, value]) => {
    return value.split(",").map((v) => ({ key, value: v.trim() }));
  });

  console.log(options);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[24px] text-white">{params?.year}</span>
      {options.map((option) => {
        if (option.key === "colors")
          return <ColorCircle size="md" color={option.value} />;
        if (["shapes", "moods"].includes(option.key))
          return (
            <span
              key={option.key}
              className="text-white border border-white px-2 py-1"
            >
              {option.value}
            </span>
          );
        return (
          <img
            src={REFACT_ICONS[option.key || ""]?.[option.value || ""]}
            alt={String(option.value).toLowerCase()}
            className={styles.filterIcon}
          />
        );
      })}
    </div>
  );
}
