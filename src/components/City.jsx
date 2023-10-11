import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import Button from "./Button";
import { useCity } from "../Contexts/CityContext";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { cities, isLoading, activeCityid } = useCity();
  const navigate = useNavigate();
  const { id } = useParams();
  const numid = Number(id);

  activeCityid.current = numid;

  // const [searchParam, setSearchpParams] = useSearchParams();
  // const lat = searchParam.get("lat");
  // const lng = searchParam.get("lng");
  // console.log(id, lat, lng);
  if (isLoading) return <Spinner />;

  const [{ cityName, emoji, date, notes }] = cities.filter(
    (city) => city.id === numid
  );

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        {
          <Button type="back" onClickHandle={() => navigate(-1)}>
            Back
          </Button>
        }
      </div>
    </div>
  );
}

export default City;
