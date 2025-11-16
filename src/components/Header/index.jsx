import clsx from "clsx";
import styles from "./Header.module.scss";

export default function Header({ hasBorder = false }) {
  return (
    <header className={styles.header}>
      <p className={styles.title}>
        Our goal is to build a visual archive that identifies & preserves the
        elements of graphic design.
      </p>
      <button className={clsx(styles.aboutButton, hasBorder && styles.border)}>
        ABOUT
      </button>
    </header>
  );
}
