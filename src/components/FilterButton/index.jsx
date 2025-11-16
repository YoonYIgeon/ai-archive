import { Button } from "@headlessui/react";
import { useMemo, useState } from "react";
import statisticsData from "../../datas/statistics.json";
import { useFilterStore } from "../../stores/filterState";
import FilterModal from "../FilterModal";

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedArchive } = useFilterStore();

  const selectedStatistics = useMemo(() => {
    return statisticsData[selectedArchive];
  }, [selectedArchive]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Filter</Button>
      <FilterModal
        open={isOpen}
        years={selectedStatistics?.year_frequency || []}
        statistics={selectedStatistics}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
