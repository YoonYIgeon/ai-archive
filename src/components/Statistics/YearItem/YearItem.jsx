import styles from "./YearItem.module.scss";

export default function YearItem({ list }) {
  const totalCount = Object.values(list).reduce((acc, value) => acc + value, 0);
  return (
    <ul className={styles.container}>
      {Object.entries(list)?.map(([year, count]) => (
        <li key={year} className={styles.item}>
          <p className={styles.year}>{year}</p>
          <div className={styles.bar}>
            <div
              className={styles.barInner}
              style={{ width: `${Math.round((count / totalCount) * 100)}%` }}
            ></div>
          </div>
          <p className={styles.percentage}>
            {Math.round((count / totalCount) * 100)}%
          </p>
        </li>
      ))}
    </ul>
  );
}
