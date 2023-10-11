import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "../Contexts/CityContext";

function CityItem({ city: { cityName, emoji, id, date, position } }) {
  const { activeCityid } = useCity();
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  return (
    <li>
      <NavLink
        className={` ${styles.cityItem} ${
          activeCityid.current === id ? styles["cityItem--active"] : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)} </time>
        <button className={styles.deleteBtn}>x</button>
      </NavLink>
    </li>
  );
}

export default CityItem;
