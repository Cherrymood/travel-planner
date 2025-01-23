import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";

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

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const [newNotes, setNewNotes] = useState(notes);
  // console.log("CurrentCity.city", currentCity);

  if (isLoading) return <Spinner />;

  function handleClick() {
    setIsEditing(true);
  }

  function handleSubmit(e) {}

  function handleCancel() {
    console.log("Cancel");
  }

  return (
    <div className={styles.city}>
      {isEditing ? (
        <form
          className={`${styles1.form} ${isLoading ? styles.loading : ""}`}
          onSubmit={handleSubmit}
        >
          <div className={styles1.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>

            <DatePicker
              id="date"
              onChange={(date) => setNewDate(date)}
              selected={newDate}
            />
          </div>

          <div className={styles1.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNewNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles1.row}>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
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
            <p>{formatDate(newDate)}</p>
          </div>

          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{newNotes}</p>
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
