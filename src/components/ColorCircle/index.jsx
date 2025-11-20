import clsx from "clsx";
import styles from "./ColorCircle.module.scss";

export default function ColorCircle({ color, size = "md", onClick }) {
  return (
    <span
      onClick={onClick}
      className={clsx(
        styles.circle,
        styles[String(color)?.toLowerCase()],
        size === "sm" && styles.sm,
        size === "lg" && styles.lg
      )}
    />
  );
}
