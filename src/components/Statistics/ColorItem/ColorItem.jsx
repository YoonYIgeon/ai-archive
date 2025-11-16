import ColorCircle from "../../ColorCircle";
import styles from "./ColorItem.module.scss";
import clsx from "clsx";

export default function ColorItem({ list }) {
  const totalCount = Object.values(list).reduce((acc, value) => acc + value, 0);
  return (
    <ul className={styles.container}>
      {Object.entries(list)?.map(([color, count]) => (
        <li
          key={color}
          className={clsx(styles.item, count === 0 && styles.none)}
        >
          <ColorCircle size="lg" color={color} />
          <p className={styles.value}>
            {count > 0 ? Math.round((count / totalCount) * 100) + "%" : "None"}
          </p>
        </li>
      ))}
    </ul>
  );
}
