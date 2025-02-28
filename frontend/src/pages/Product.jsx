import PageNav from "../components/PageNav";
import styles from "./Product.module.css";
import React from "react";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src="/img-4.jpg" alt="map with photoes of travels" />
        <div>
          <h2>About Travel planner</h2>
          <p>
            A travel planner is an essential tool for organizing and optimizing
            your adventures, whether you're planning a weekend getaway or a
            multi-week journey. It helps you map out your itinerary, set
            priorities, and ensure you make the most of your time in each
            destination.
          </p>
          <p>
            More than just a practical tool, a travel planner can also be a
            source of inspiration. Many planners offer personalized suggestions
            based on your preferences, such as recommending hidden gems or
            cultural experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
