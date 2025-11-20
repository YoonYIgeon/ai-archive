import clsx from "clsx";
import styles from "./Header.module.scss";
import { useSearchParams } from "react-router-dom";

export default function Header({ hasBorder = false }) {
const [,setSearchParams] = useSearchParams();
  return (
    <header className={'flex justify-between items-center border-b border-[#777777] w-full bg-black'}>
      <p className={clsx(styles.title, 'cursor-pointer')} onClick={() => setSearchParams({})} >
        Our goal is to build a visual archive that identifies & preserves the
        elements of graphic design.
      </p>
      <div className={"max-w-105 w-full border-l border-[#777777] text-right text-sm font-light block p-2"}>
        <button>
          ABOUT
        </button>
      </div>
    </header>
  );
}
