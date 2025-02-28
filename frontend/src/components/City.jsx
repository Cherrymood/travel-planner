import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import React from "react";

import styles from "./City.module.css";
import Spinner from "./Spinner";
import EditCity from "./EditCity";

const formatDate = (date) => {
  const validDate = new Date(date);

  if (isNaN(validDate)) {
    return "Unknown Date";
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
  const { currentCity, getCity, isLoading, updateCity } = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <Spinner />;

  function handleClick() {
    setIsEditing(true);
  }

  if (isLoading || !currentCity) return <Spinner />;

  return (
    <div className={styles.city}>
      {isEditing ? (
        <EditCity
          setIsEditing={setIsEditing}
          id={id}
          updateCity={updateCity}
          currentCity={currentCity}
        />
      ) : (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}{" "}
              <button className={styles.updateBtn} onClick={handleClick}>
                &#128396;
              </button>
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date)}</p>
          </div>

          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>

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
        </>
      )}
    </div>
  );
}
