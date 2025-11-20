import clsx from "clsx";
import { useEffect, useState } from "react";
import { ICONS, REFACT_ICONS } from "../../constants/config";
import useGetFilterDetail from "../../hooks/useGetFilterDetail";
import ColorCircle from "../ColorCircle";
import styles from "./FilterDetail.module.scss";
import { useSearchParams } from "react-router-dom";

const getPercentage = (value, total) => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

export default function FilterDetail({ option, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (option) {
      setIsOpen(true);
    }
  }, [option]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const data = useGetFilterDetail(option);

  return (
    <div
      className={clsx(
        styles.container,
        isOpen && styles.open,
        !isOpen && styles.close
      )}
    >
      {/* 뒤로가기 */}
      <button className={styles.backButton} onClick={handleClose}>
        <img src="/images/icon_back.png" alt="back" />
      </button>
      <div className={styles.optionContainer}>
        <p className={styles.optionTitle}>{option.toUpperCase()}</p>
        {option === "shapes" || option === "moods" ? (
          <List option={option} data={data || []} />
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

  const orderMap = {
    contrasts: ["High", "Medium", "Low"],
    balances: ["Symmetric", "Asymmetric", "Radial"],
    whitespaces: ["High", "Medium", "Low"],
    forms: ["2D", "3D", "Photo"],
    emphases: ["Center", "Top", "Bottom", "Left", "Right"],
    colors: ["Red","Orange","Yellow","Green","Blue","Purple","Monochrome"
    ],
  };
  const order = orderMap[option];


  return (
    <div>
      {/* 연도 헤더 */}
      <div className='flex gap-10'>
        <div className='flex flex-col gap-10'>
          <div className="h-9"/>
          {order.map((name) => (
            <div key={name} className="min-h-14 max-h-14">
              {option === "colors" ? (
                <span className={styles.colorCircle}>
                  <ColorCircle color={name} />
                </span>
              ) : (
                <div className={styles.imageContainer}>
                  <img
                    src={REFACT_ICONS[option][name]}
                    alt={name}
                    className={styles.image}
                  />
                  <p>{name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {Object.keys(data).sort((a, b) => b - a).map((year) => {
          const yearData = data[year];
          const total = Object.values(yearData).reduce((acc, curr) => acc + curr, 0);

          return (
            <div className='flex flex-col gap-10 h-9'>
              <div key={year} className="h-9">
                <p className={styles.year}>{year}</p>
              </div>
              {order.map((name) => (
                <div key={name} className={clsx("min-h-14 flex flex-col justify-center items-end", data[year][name] ? '':'opacity-50')} >
                  <p className={styles.value }>{data[year][name] || "None"}</p>
                  <p className='text-xs'>{getPercentage(data[year][name] || 0, total)}%</p>
                </div>
              ))}
            </div>
          )})}
      </div>
    </div>
  );
};

const List = ({option, data }) => {
  const [, setSearchParams] = useSearchParams();
  return (
    <div className={styles.dataContainer}>
      {Object.keys(data)?.map((year) => (
        <div key={year}>
          <p className={styles.year}>{year}</p>
          <ul className={styles.dataList}>
            {Object.entries(data?.[year])?.sort(([,a], [,b]) => b - a).map(([name, count]) => (
              <li key={name} className='cursor-pointer' onClick={() => {
                setSearchParams((prev) => {
                  return {year, [option]: name};
                });
              }}>
                <span className={styles.name}>{name}</span>
                <span className={styles.value}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
