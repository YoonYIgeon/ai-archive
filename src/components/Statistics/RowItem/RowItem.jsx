import { ICONS } from "../../../constants/config";
import styles from "./RowItem.module.scss";
import clsx from "clsx";

export default function RowItem({ category, list }) {
  const totalCount = Object.values(list).reduce((acc, value) => acc + value, 0);
  return (
    <ul className={styles.container}>
      {Object.entries(list)?.map(([keyword, count]) => (
        <li
          key={keyword}
          className={clsx(styles.item, count === 0 && styles.none)}
        >
          <img
            src={ICONS[category.replace("_", "")][keyword]}
            alt={String(keyword).toLowerCase()}
            className={styles.image}
          />
          <p className={styles.name}>{keyword}</p>
          <p className={styles.value}>
            {count > 0 ? Math.round((count / totalCount) * 100) + "%" : "None"}
          </p>
        </li>
      ))}
    </ul>
  );
}
