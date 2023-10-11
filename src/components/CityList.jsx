import styles from "./CityList.module.css";
import Spinner from "./Spinner";

import CityItem from "./CityItem";
import Message from "./Message";
import { useCity } from "../Contexts/CityContext";

function CityList() {
  const { cities, isLoading } = useCity("");

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message="Please click on Map to Add Cities" />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}{" "}
    </ul>
  );
}

export default CityList;
