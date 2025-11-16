import clsx from "clsx";
import ColorCircle from "../ColorCircle";
import styles from "./ImageDetailModal.module.scss";
import { useEffect, useState } from "react";
import { ICONS } from "../../constants/config";

export default function ImageDetailModal({ image, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (image) {
      setIsOpen(true);
    }
  }, [image]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  return (
    <div
      className={clsx(
        styles.container,
        isOpen && styles.open,
        !isOpen && styles.close
      )}
    >
      <button className={styles.closeButton} onClick={handleClose}>
        <img
          src="/images/icon_close.png"
          alt="close"
          className={styles.closeIcon}
        />
      </button>
      <div className={styles.iconContainer}>
        <span className={styles.year}>{image?.year} </span>
        {image?.Color?.map((color) => (
          <ColorCircle
            key={color}
            size="sm"
            color={String(color).toLowerCase()}
          />
        ))}
        <Icon category="form" value={image?.Form} />
        <Icon category="emphasis" value={image?.Emphasis} />
        <Icon category="balance" value={image?.Balance} />
        <Icon category="contrast" value={image?.Contrast} />
        <Icon category="whitespace" value={image?.["White space"]} />
      </div>
      <img
        src={`/archives/${image?.file_name?.replace("#", "")}`}
        alt={image?.name}
        className={styles.image}
      />
      <span className={styles.descriptionTitle}>Basic Information</span>
      <p className={styles.description}>{image?.["Basic Information"]}</p>
      <span className={styles.descriptionTitle}>Color Scheme</span>
      <p className={styles.description}>{image?.["Color Scheme"]}</p>
      <span className={styles.descriptionTitle}>Composition</span>
      <p className={styles.description}>{image?.["Composition"]}</p>
      <span className={styles.descriptionTitle}>Shape</span>
      <p className={styles.description}>{image?.["Shape"]}</p>
      <span className={styles.descriptionTitle}>Mood</span>
      <p className={styles.description}>{image?.["Mood & Texture"]}</p>
    </div>
  );
}

const Icon = ({ category, value }) => {
  return (
    <img src={ICONS[category][value]} alt={category} className={styles.icon} />
  );
};
