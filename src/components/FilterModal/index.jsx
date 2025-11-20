import clsx from "clsx";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetImages, { totalImages } from "../../hooks/useGetImages";
import ColorCircle from "../ColorCircle";
import FilterDetail from "../FilterDetail";
import styles from "./FilterModal.module.scss";
import { trimArray, parseSearchParamsToJson } from "../../utils";

const getOptions = (images, year) => {
  return images.reduce(
    (obj, item) => {
      // 옵션에 있는 값들을 일단 꺼낸다.
      const shapes = trimArray(item["Shape Keyword"] || []); // 배열
      const mood = trimArray(item["Mood Keyword"] || []); // 배열
      const color = trimArray(item["Color"] || []); // 배열
      const form = item["Form"].trim(); // 문자열
      const emphasis = item["Emphasis"].trim(); // 문자열
      const balance = item["Balance"].trim(); // 문자열
      const contrast = item["Contrast"].trim(); // 문자열
      const whitespace = item["White space"].trim(); // 문자열

      // 객체로 만들었다가 key값으로 가져오는 방식으로 해서 unique한 값들을 가져오고, statistics도 가져온다.
      if (year && item.year !== year) {
        // 패스하는 조건
        return obj;
      }

      if (shapes && shapes.length > 0) {
        shapes.forEach((shape) => {
          obj.shapes[shape] = (obj.shapes[shape] || 0) + 1;
        });
      }

      if (mood && mood.length > 0) {
        mood.forEach((mood) => {
          obj.moods[mood] = (obj.moods[mood] || 0) + 1;
        });
      }

      if (color && color.length > 0) {
        color.forEach((color) => {
          obj.colors[color] = (obj.colors[color] || 0) + 1;
        });
      }

      if (form) {
        obj.forms[form] = (obj.forms[form] || 0) + 1;
      }

      if (emphasis) {
        obj.emphases[emphasis] = (obj.emphases[emphasis] || 0) + 1;
      }

      if (balance) {
        obj.balances[balance] = (obj.balances[balance] || 0) + 1;
      }

      if (contrast) {
        obj.contrasts[contrast] = (obj.contrasts[contrast] || 0) + 1;
      }

      if (whitespace) {
        obj.whitespaces[whitespace] = (obj.whitespaces[whitespace] || 0) + 1;
      }

      return obj;
    },
    {
      shapes: {},
      moods: {},
      colors: {},
      forms: {},
      emphases: {},
      balances: {},
      contrasts: {},
      whitespaces: {},
    }
  );
};

const filterOptions = [
  // year는 별도로 관리한다.
  {
    name: "SHAPE",
    key: "shapes",
    multiple: true,
    type: "default",
  },
  {
    name: "MOOD",
    key: "moods",
    multiple: true,
    type: "default",
  },
  {
    name: "COLOR",
    key: "colors",
    multiple: true,
    type: "default",
  },
  {
    name: "FORM",
    key: "forms",
    multiple: true,
    type: "default",
  },
  {
    name: "EMPHASIS",
    key: "emphases",
    multiple: true,
    type: "default",
  },
  {
    name: "BALANCE",
    key: "balances",
    multiple: true,
    type: "default",
  },
  {
    name: "CONTRAST",
    key: "contrasts",
    multiple: true,
    type: "default",
  },
  {
    name: "WHITE SPACE",
    key: "whitespaces",
    multiple: true,
    type: "default",
  },
];

export default function FilterModal({ open, onClose, statistics, years }) {
  const [isOpenFilterDetailModal, setIsOpenFilterDetailModal] = useState(false);
  const [selectedDetailOption, setSelectedDetailOption] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);

  const options = getOptions(totalImages, params.year);

  const yearList = useMemo(() => {
    if (!statistics) return [];
    return [
      { keyword: "ALL", value: "ALL" },
      ...(years?.map((item) => ({
        keyword: item.year,
        value: item.year,
      })) || []),
    ];
  }, [statistics, years]);

  const handleSeeAll = (option) => {
    setIsOpenFilterDetailModal(true);
    setSelectedDetailOption(option);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSelect = ({ key, multiple }, keyword, override = false) => {
    setSearchParams((prev) => {
      const origin = parseSearchParamsToJson(prev);
      const value = multiple
        ? origin[key]
          ? origin[key].split(",")
          : []
        : origin[key];

      if (multiple) {
        origin[key] = value.includes(keyword)
          ? value.filter((item) => item !== keyword).join(",")
          : [...value, keyword].join(",");
      } else {
        origin[key] = value === keyword ? "" : keyword;
      }

      if (override) {
        return keyword ? { [key]: keyword } : {};
      }

      return Object.entries(origin).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      }, {});
    });
  };

  const handleYearSelect = (value) => {
    handleSelect(
      { key: "year", multiple: false },
      value === "ALL" ? undefined : value,
      true
    );
  };

  return (
    <>
      <div
        className={clsx(styles.container, open ? styles.open : styles.close)}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <img
            src="/images/icon_close.png"
            alt="close"
            className={styles.closeIcon}
          />
        </button>
        <div className={"flex flex-col gap-5 py-2.5"}>
          <Title label="Year" onSeeAll={() => handleSeeAll("year")} />
          <ul className={styles.list}>
            {yearList.map(({ keyword, value }) => (
              <li
                key={keyword}
                className={clsx(
                  styles.option,
                  params.year === keyword || (!params.year && keyword === "ALL")
                    ? "text-white border-white"
                    : "opacity-50"
                )}
              >
                <button onClick={() => handleYearSelect(value)}>
                  {keyword}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.divider} />

        {filterOptions.map((item) => (
          <div className={styles.item}>
            <Title
              count={Object.keys(options[item.key] || {}).length}
              label={item.name}
              onSeeAll={() => handleSeeAll(item.key)}
            />
            <ul
              className={item.key === "colors" ? styles.colorList : styles.list}
            >
              {Object.entries(options[item.key] || {})
                .sort(([,a], [,b]) => a === b ? 0 : a > b ? -1 : 1)
                .slice(0, 10)
                .map(([keyword]) => (
                  <li
                    key={keyword}
                    onClick={() => handleSelect(item, keyword)}
                    className={
                      item.key === "colors"
                        ? clsx(
                            styles.colorOption,
                            params[item.key]?.split(",")?.includes(keyword)
                              ? ""
                              : "opacity-50"
                          )
                        : clsx(
                            styles.option,
                            params[item.key]?.split(",")?.includes(keyword)
                              ? "text-white border-white"
                              : "opacity-50"
                          )
                    }
                  >
                    {item.key === "colors" ? (
                      <ColorCircle color={keyword} />
                    ) : (
                      <button >
                        {keyword}
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {isOpenFilterDetailModal && (
        <FilterDetail
          option={selectedDetailOption}
          onClose={() => setIsOpenFilterDetailModal(false)}
        />
      )}
    </>
  );
}
const Title = ({ label, count, onSeeAll }) => {
  return (
    <div className={styles.title}>
      {label}
      {count > 0 && <span className="ml-2">({count})</span>}
      {count > 10 && (
        <button className={styles.seeAllButton} onClick={() => onSeeAll(label)}>
          See All
        </button>
      )}
    </div>
  );
};
