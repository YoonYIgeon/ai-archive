import { useSearchParams } from "react-router-dom";
import useGetImages from "../../hooks/useGetImages";
import { parseSearchParamsToJson, trimArray } from "../../utils";
import ColorItem from "./ColorItem/ColorItem";
import RowItem from "./RowItem/RowItem";
import styles from "./Statistics.module.scss";
import YearItem from "./YearItem/YearItem";

const getStatistics = (images) => {
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

      obj.years[year] = (obj.years[year] || 0) + 1;

      shapes.forEach((shape) => {
        obj.shapes[shape] = (obj.shapes[shape] || 0) + 1;
      });

      moods.forEach((mood) => {
        obj.moods[mood] = (obj.moods[mood] || 0) + 1;
      });

      colors.forEach((color) => {
        obj.colors[color] = (obj.colors[color] || 0) + 1;
      });

      obj.forms[form] = (obj.forms[form] || 0) + 1;

      obj.emphases[emphasis] = (obj.emphases[emphasis] || 0) + 1;

      obj.balances[balance] = (obj.balances[balance] || 0) + 1;

      obj.contrasts[contrast] = (obj.contrasts[contrast] || 0) + 1;

      obj.whitespaces[whitespace] = (obj.whitespaces[whitespace] || 0) + 1;

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
  const [searchParams] = useSearchParams();
  const params = parseSearchParamsToJson(searchParams);
  const images = useGetImages();

  const statistics = getStatistics(images, params);

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
