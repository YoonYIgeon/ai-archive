import styles from "./YearItem.module.scss";

export default function YearItem({ list }) {
  const totalFrequency = list?.reduce((acc, item) => acc + item.frequency, 0);
  return (
    <ul className={styles.container}>
      {list?.map((item) => (
        <li key={item.year} className={styles.item}>
          <p className={styles.year}>{item.year}</p>
          <div className={styles.bar}>
            <div
              className={styles.barInner}
              style={{
                width: `${Math.round(
                  (item.frequency / totalFrequency) * 100
                )}%`,
              }}
            ></div>
          </div>
          <p className={styles.percentage}>
            {Math.round((item.frequency / totalFrequency) * 100)}%
          </p>
        </li>
      ))}
    </ul>
  );
}
