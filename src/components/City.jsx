import { Navigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  const validDate = new Date(date);

  // Check if the date is valid
  if (isNaN(validDate)) {
    return "Unknown Date"; // Fallback for invalid dates
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(validDate);
};

export default function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading, isEditing } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  if (!currentCity) {
    return (
      <div className={styles.error}>
        <p>City data could not be loaded. Please try again.</p>
        <BackButton />
      </div>
    );
  }

  // const { city } = currentCity;
  // console.log(currentCity);
  const { cityName, emoji, date, notes } = currentCity;
  console.log("CurrentCity", currentCity);

  return (
    // {isEditing ? navigate()}
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
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
        <BackButton />
      </div>
    </div>
  );
}
