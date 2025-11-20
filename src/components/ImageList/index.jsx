import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import useGetImages from "../../hooks/useGetImages";
import styles from "./ImageList.module.scss";
import clsx from "clsx";

export default function ImageList({ onSelect }) {
  const parentRef = useRef(null);
  // 이미지 필터링은 오직 여기서만 한다.
  const images = useGetImages();

  // 한 줄에 3개씩 배치하므로 행의 개수 계산
  const itemsPerRow = 3;
  const rowCount = Math.ceil(images.length / itemsPerRow);

  const virtualizedList = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    getItemSize: () => 330, // 320px + 10px gap
    estimateSize: () => 330,
    overscan: 3,
  });

  return (
    <div className="h-10 flex-grow-1 flex flex-col gap-2">
      <span className="px-4">총 {images.length}개</span>
      <div className="h-10 px-4 flex-grow-1 overflow-auto" ref={parentRef}>
        {images.length === 0 ? (
          <div className={styles.empty}>
            <p>목록이 없습니다.</p>
          </div>
        ) : (
          <div
            className={styles.list}
            style={{
              height: `${virtualizedList.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualizedList.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * itemsPerRow;
              const endIndex = Math.min(startIndex + itemsPerRow, images.length);
              const rowItems = images.slice(startIndex, endIndex);

              return (
                <div
                  key={virtualRow.index}
                  className={styles.row}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "320px",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  ref={virtualizedList.measureElement}
                >
                  {rowItems.map((item, itemIndex) => (
                    <div
                      key={`${item.id}-${startIndex + itemIndex}`}
                      className={clsx(styles.item, "bg-black")}
                    >
                      <img
                        loading="lazy"
                        src={`/archives/${item.file_name.replace("#", "")}`}
                        alt={item.name}
                        className={clsx(styles.image, 'bg-black')}
                        onClick={() => onSelect(item)}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
