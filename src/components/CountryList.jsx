import { useCity } from "../Contexts/CityContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
function CountryList() {
  const { cities, isLoading } = useCity();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <Message message=" There is no COUNTRY PLEASE Click on map to add country" />
    );
  }

  return (
    <ul className={styles.countryList}>
      {cities
        .reduce((countryArr, curr) => {
          if (!countryArr.some((city) => city.country === curr.country))
            countryArr.push({ country: curr.country, emoji: curr.emoji });
          return countryArr;
        }, [])
        .map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
    </ul>
  );
}

export default CountryList;
