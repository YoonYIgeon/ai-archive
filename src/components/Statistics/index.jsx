import styles from "./Statistics.module.scss";
import YearItem from "./YearItem/YearItem";
import ColorItem from "./ColorItem/ColorItem";
import RowItem from "./RowItem/RowItem";
import { parseSearchParamsToJson, trimArray } from "../../utils";
import { useSearchParams } from "react-router-dom";
import { totalImages } from "../../hooks/useGetImages";

const getStatistics = (images, params) => {
  return images.reduce(
    (obj, item) => {
      // 옵션에 있는 값들을 일단 꺼낸다.
      const shapes = trimArray(item["Shape Keyword"] || []); // 배열
      const moods = trimArray(item["Mood Keyword"] || []); // 배열
      const colors = trimArray(item["Color"] || []); // 배열
      const form = item["Form"].trim(); // 문자열
      const emphasis = item["Emphasis"].trim(); // 문자열
      const balance = item["Balance"].trim(); // 문자열
      const contrast = item["Contrast"].trim(); // 문자열
      const whitespace = item["White space"].trim(); // 문자열
      const year = item["year"].trim(); // 문자열

      // 객체로 만들었다가 key값으로 가져오는 방식으로 해서 unique한 값들을 가져오고, statistics도 가져온다.

      if (
        year &&
        (!params.year || params.year === "ALL" || params.year === year)
      ) {
        obj.years[year] = (obj.years[year] || 0) + 1;
      }

      if (
        (params.shapes?.split(",")?.some((shape) => shapes.includes(shape)) ||
          !params.shapes) &&
        shapes.length > 0
      ) {
        shapes.forEach((shape) => {
          obj.shapes[shape] = (obj.shapes[shape] || 0) + 1;
        });
      }

      if (
        (params.moods?.split(",")?.some((mood) => moods.includes(mood)) ||
          !params.moods) &&
        moods &&
        moods.length > 0
      ) {
        moods.forEach((mood) => {
          obj.moods[mood] = (obj.moods[mood] || 0) + 1;
        });
      }

      if (
        (params.colors?.split(",")?.some((color) => colors.includes(color)) ||
          !params.colors) &&
        colors &&
        colors.length > 0
      ) {
        colors.forEach((color) => {
          obj.colors[color] = (obj.colors[color] || 0) + 1;
        });
      }

      if (form && (!params.form || params.form === form)) {
        obj.forms[form] = (obj.forms[form] || 0) + 1;
      }

      if (emphasis && (!params.emphasis || params.emphasis === emphasis)) {
        obj.emphases[emphasis] = (obj.emphases[emphasis] || 0) + 1;
      }

      if (balance && (!params.balance || params.balance === balance)) {
        obj.balances[balance] = (obj.balances[balance] || 0) + 1;
      }

      if (contrast && (!params.contrast || params.contrast === contrast)) {
        obj.contrasts[contrast] = (obj.contrasts[contrast] || 0) + 1;
      }

      if (
        whitespace &&
        (!params.whitespace || params.whitespace === whitespace)
      ) {
        obj.whitespaces[whitespace] = (obj.whitespaces[whitespace] || 0) + 1;
      }

      return obj;
    },
    {
      shapes: {},
      moods: {},
      colors: {},
      forms: {},
      emphases: {},
      balances: {},
      contrasts: {},
      whitespaces: {},
      years: {},
    }
  );
};

export default function Statistics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);

  const statistics = getStatistics(totalImages, params);

  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <p className={styles.title}>YEAR</p>
        <YearItem list={statistics?.years} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>COLOR</p>
        <ColorItem list={statistics?.colors} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>FORM</p>
        <RowItem category="form" list={statistics?.forms} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>EMPHASIS</p>
        <RowItem category="emphasis" list={statistics?.emphases} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>BALANCE</p>
        <RowItem category="balance" list={statistics?.balances} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>CONTRAST</p>
        <RowItem category="contrast" list={statistics?.contrasts} />
      </li>
      <li className={styles.item}>
        <p className={styles.title}>WHITE SPACE</p>
        <RowItem category="white_space" list={statistics?.whitespaces} />
      </li>
    </ul>
  );
}
