import Sidebar from "../components/SIdebar";
import PageNav from "../components/PageNav";
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
