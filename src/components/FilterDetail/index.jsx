import styles from "./FilterDetail.module.scss";
import archivesData from "../../datas/archives.json";
import { useEffect, useState } from "react";
import ColorCircle from "../ColorCircle";
import clsx from "clsx";
import { ICONS } from "../../constants/config";
import useGetFilterDetail from "../../hooks/useGetFilterDetail";

export default function FilterDetail({ option, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const allArchives = { all: { id: 0, name: "ALL" }, ...archivesData };
  const [archive, setArchive] = useState("all");

  useEffect(() => {
    if (option) {
      setIsOpen(true);
    }
  }, [option]);

  const handleSelectArchive = (archive) => {
    setArchive(archive);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
      setArchive("all");
    }, 500);
  };

  const data = useGetFilterDetail(option, archive);

  return (
    <div
      className={clsx(
        styles.container,
        isOpen && styles.open,
        !isOpen && styles.close
      )}
    >
      <button className={styles.backButton} onClick={handleClose}>
        <img src="/images/icon_back.png" alt="back" />
      </button>
      <ul className={styles.archiveList}>
        {Object.keys(allArchives).map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelectArchive(item)}
              className={archive === item ? styles.selected : ""}
            >
              {allArchives[item]?.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.optionContainer}>
        <p className={styles.optionTitle}>{option.toUpperCase()}</p>
        {option === "Shape" || option === "Mood" ? (
          <List data={data || []} />
        ) : (
          <TableList option={option} data={data || []} />
        )}
      </div>
    </div>
  );
}

const TableList = ({ option, data }) => {
  // data가 객체 형태이므로 연도별로 처리
  if (!data || Object.keys(data).length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  // 데이터를 테이블 형태로 변환
  const transformDataForTable = (data) => {
    const years = Object.keys(data).sort((a, b) => b - a); // 연도 내림차순 정렬
    const allKeywords = new Set();

    // 모든 키워드 수집 (순서 유지를 위해 첫 번째 연도의 순서를 기준으로)
    const firstYearData = data[years[0]] || [];
    firstYearData.forEach((item) => {
      allKeywords.add(item.keyword);
    });

    // 나머지 연도에서 누락된 키워드 추가
    years.forEach((year) => {
      data[year]?.forEach((item) => {
        allKeywords.add(item.keyword);
      });
    });

    // 키워드별로 연도별 데이터 매핑 (빈도수와 퍼센트 모두)
    const tableData = Array.from(allKeywords).map((keyword) => {
      const yearData = {};
      years.forEach((year) => {
        const item = data[year]?.find((item) => item.keyword === keyword);
        yearData[year] = item
          ? {
              frequency: item.frequency,
              percentage: item.percentage,
            }
          : {
              frequency: "None",
              percentage: "0.0%",
            };
      });
      return {
        keyword,
        yearData,
      };
    });

    return { years, tableData };
  };

  const { years, tableData } = transformDataForTable(data);

  return (
    <div>
      {/* 연도 헤더 */}
      <ul className={styles.yearList}>
        {years.map((year) => (
          <li key={year}>
            <p className={styles.year}>{year}</p>
          </li>
        ))}
      </ul>

      {/* 테이블 데이터 */}
      <ul className={styles.table}>
        {tableData.map((item, listIndex) => {
          const { keyword, yearData } = item;
          return (
            <li key={listIndex} className={styles.tableItem}>
              {option === "color" ? (
                <span className={styles.colorCircle}>
                  <ColorCircle color={keyword} />
                </span>
              ) : (
                <div className={styles.imageContainer}>
                  <img
                    src={ICONS[option][keyword]}
                    alt={keyword}
                    className={styles.image}
                  />
                  <p>{keyword}</p>
                </div>
              )}
              <div className={styles.valueList}>
                {years.map((year) => (
                  <div
                    key={year}
                    className={clsx(
                      styles.valueContainer,
                      yearData[year].frequency === "None" && styles.none
                    )}
                  >
                    <p className={styles.value}>{yearData[year].frequency}</p>
                    <p className={styles.percent}>
                      {yearData[year].percentage}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const List = ({ data }) => {
  return (
    <div className={styles.dataContainer}>
      {Object.keys(data)?.map((year, index) => (
        <div key={index}>
          <p className={styles.year}>{year}</p>
          <ul className={styles.dataList}>
            {data?.[year]?.map((item, listIndex) => (
              <li key={`${listIndex}-${item.name}`}>
                <span className={styles.name}>{item?.keyword}</span>
                <span className={styles.value}>{item?.frequency}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
