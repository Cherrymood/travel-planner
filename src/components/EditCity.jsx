import { useState } from "react";
import styles from "./CityItem.module.css";
import DatePicker from "react-datepicker";
import styles1 from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";

export default function EditCity({
  setIsEditing,
  id,
  updateCity,
  currentCity,
}) {
  const [newDate, setNewDate] = useState(new Date());
  const [newNotes, setNewNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!newNotes.trim()) {
      alert("Notes field cannot be empty.");
      return;
    }
    if (!newDate) {
      alert("Please select a valid date.");
      return;
    }

    updateCity(id, newDate, newNotes);
    setIsEditing(false);
  }

  return (
    <div className={styles.city}>
      <form className={styles1.form} onSubmit={handleSubmit}>
        <div className={styles1.row}>
          <label htmlFor="newDate">
            When did you go to {currentCity.cityName}?
          </label>
          <DatePicker id="newDate" onChange={setNewDate} selected={newDate} />
        </div>

        <div className={styles1.row}>
          <label htmlFor="newNotes">
            Notes about your trip to {currentCity.cityName}
          </label>
          <textarea
            id="newNotes"
            onChange={(e) => setNewNotes(e.target.value)}
            value={newNotes}
          />
        </div>

        <div className={styles1.row}>
          <Button type="submit">Save</Button>
        </div>
      </form>

      <div>
        <BackButton />
      </div>
    </div>
  );
}
