import styles from "./Statistics.module.scss";
import YearItem from "./YearItem/YearItem";
import ColorItem from "./ColorItem/ColorItem";
import RowItem from "./RowItem/RowItem";

export default function Statistics() {
  const statistics = {};

  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <p className={styles.title}>YEAR</p>
        <YearItem list={statistics?.year_frequency} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>COLOR</p>
        <ColorItem list={statistics?.color_frequency} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>FORM</p>
        <RowItem category="form" list={statistics?.form_frequency} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>EMPHASIS</p>
        <RowItem category="emphasis" list={statistics?.emphasis_frequency} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>BALANCE</p>
        <RowItem category="balance" list={statistics?.balance_frequency} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>CONTRAST</p>
        <RowItem category="contrast" list={statistics?.contrast_frequency} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>WHITE SPACE</p>
        <RowItem
          category="white_space"
          list={statistics?.white_space_frequency}
        />
      </li>
    </ul>
  );
}
