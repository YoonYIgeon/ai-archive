import { ICONS } from "../../../constants/config";
import styles from "./RowItem.module.scss";
import clsx from "clsx";

export default function RowItem({ category, list }) {
  return (
    <ul className={styles.container}>
      {list?.map((item) => (
        <li
          key={item.keyword}
          className={clsx(styles.item, item.frequency === 0 && styles.none)}
        >
          <img
            src={ICONS[category.replace("_", "")][item.keyword]}
            alt={String(item.keyword).toLowerCase()}
            className={styles.image}
          />
          <p className={styles.name}>{item.keyword}</p>
          <p className={styles.value}>
            {item.frequency > 0
              ? Math.round(item.percentage * 100) + "%"
              : "None"}
          </p>
        </li>
      ))}
    </ul>
  );
}
