import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import React from "react";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
