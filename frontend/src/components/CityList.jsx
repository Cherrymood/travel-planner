import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import React from "react";

import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  // console.log("CityList",cities);

  if (isLoading) return <Spinner />;

  if (!cities)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
