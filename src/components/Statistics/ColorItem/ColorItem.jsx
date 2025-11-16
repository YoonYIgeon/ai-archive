import ColorCircle from "../../ColorCircle";
import styles from "./ColorItem.module.scss";
import clsx from "clsx";

export default function ColorItem({ list }) {
  const totalFrequency = list?.reduce((acc, item) => acc + item.frequency, 0);
  return (
    <ul className={styles.container}>
      {list?.map((item) => (
        <li
          key={item.color}
          className={clsx(styles.item, item.frequency === 0 && styles.none)}
        >
          <ColorCircle size="lg" color={item.color} />
          <p className={styles.value}>
            {item.frequency > 0
              ? Math.round((item.frequency / totalFrequency) * 100) + "%"
              : "None"}
          </p>
        </li>
      ))}
    </ul>
  );
}
