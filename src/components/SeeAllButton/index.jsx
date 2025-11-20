import { useState } from "react";
import FilterDetail from "../FilterDetail";

const SeeAllButton = ({ type }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        style={{
          fontSize: '16px',
          color: '#a9a9a9',
          marginLeft: "10px"
        }}>
        See All
      </button>
      {open && <FilterDetail
        option={type}
        onClose={() => setOpen(false)}
      />}
    </>
  );
};

export default SeeAllButton;