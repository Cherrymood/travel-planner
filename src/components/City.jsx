import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import React from "react";

import styles from "./City.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles1 from "./Form.module.css";

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
  // console.log("CurrentCity", currentCity);

  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const [newNotes, setNewNotes] = useState(notes);

  if (isLoading) return <Spinner />;

  function handleClick() {
    setIsEditing(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateCity(id, newDate, newNotes);
    setIsEditing(!isEditing);
  }

  return (
    <div className={styles.city}>
      {isEditing ? (
        <form
          className={`${styles1.form} ${isLoading ? styles.loading : ""}`}
          onSubmit={handleSubmit}
        >
          <div className={styles1.row}>
            <label htmlFor="newDate">When did you go to {cityName}?</label>

            <DatePicker
              id="newDate"
              onChange={(newDate) => setNewDate(newDate)}
              // onChange={(e) => console.log(e.target.value)}
              selected={newDate}
            />
          </div>

          <div className={styles1.row}>
            <label htmlFor="newNotes">
              Notes about your trip to {cityName}
            </label>
            <textarea
              id="newNotes"
              onChange={(e) => setNewNotes(e.target.value)}
              // onChange={(e) => console.log(e.target.value)}
              value={newNotes}
            />
          </div>

          <div className={styles1.row}>
            <Button type="submit">Save</Button>
          </div>
        </form>
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

      <div>
        <BackButton />
      </div>
    </div>
  );
}
