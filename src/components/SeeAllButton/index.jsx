import { useState } from "react";
import FilterDetail from "../FilterDetail";

const SeeAllButton = ({ type }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="text-[#a9a9a9]"
      >
        See All
      </button>
      <FilterDetail
        open={open}
        option={type}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default SeeAllButton;