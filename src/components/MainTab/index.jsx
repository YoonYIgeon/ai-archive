import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import archives from "../../datas/archives.json";
import { useFilterStore } from "../../stores/filterState";
import { useImageListStore } from "../../stores/imageState";

export default function MainTab() {
  const allArchives = { all: { id: 0, name: "ALL" }, ...archives };
  const { selectedArchive, setSelectedArchive, setFilterOptions, setTab } =
    useFilterStore(useShallow((state) => state));

  const { setImageList } = useImageListStore();

  const handleSelectArchive = (archive = "all") => {
    setSelectedArchive(archive);
    setFilterOptions({ year: "ALL", type: null, value: null });
    setTab(null);

    // effect까지 갈 필요 없이 여기서 호출해도 된다.
    const updateImageList = (archive) => {
      if (archive === "all") {
        const images = Object.values(archives).flatMap(
          (archive) => archive.images
        );
        setImageList(images);
      } else {
        const images = archives[archive]?.images || [];
        setImageList(images);
      }
    };
    updateImageList(archive);
  };

  return (
    <div className="p-4">
      <ul className={"flex items-center gap-2 border-[#777777]"}>
        {Object.keys(allArchives).map((item) => {
          const active = item === selectedArchive;
          return (
            <li
              key={item}
              className={clsx(
                "block border-b-2 border-[#777777] flex gap-1 px-2 py-1 cursor-pointer uppercase text-lg",
                active ? "border-white" : "border-transparent"
              )}
              onClick={() => handleSelectArchive(item)}
            >
              {allArchives[item]?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
