import clsx from "clsx";
import styles from "../FilterModal/FilterModal.module.scss";
import { useSearchParams } from "react-router-dom";
import { parseSearchParamsToJson } from "../../utils";

const topMoods = [
  {type: "moods", keyword: "Modern"},
  {type: "moods", keyword: "Precise"},
  {type: "moods", keyword: "Vibrant"},
  {type: "moods", keyword: "Authentic"},
  {type: "moods", keyword: "Clean"}
]
const topShapes = [
  {type: "shapes", keyword: "Geometric"},
  {type: "shapes", keyword: "Typographic"},
  {type: "shapes", keyword: "Modular"},
  {type: "shapes", keyword: "Organic"},
  {type: "shapes", keyword: "Type-as-Image"}
]

export default function Placeholder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);
  return (
    <div className="flex flex-col justify-center gap-2">
      <span className="text-white opacity-50">Tag Recommendation</span>
      <ul className={'flex gap-2'}>
            {[...topMoods, ...topShapes].map(({ type, keyword }) => (
              <li
                key={keyword}
                className={clsx(
                  styles.option,
                  params[type] === keyword ? "text-white border-white"
                    : "opacity-50"
                )}
                onClick={() =>{
                  setSearchParams((prev) => {
                    const origin = parseSearchParamsToJson(prev);
                    origin[type] = keyword;
                    return origin;
                  });
                }}
              >
                <button >
                  {keyword}
                </button>
              </li>
            ))}
          </ul>
    </div>
  );
}