import styles from "./Footer.module.css";
import React from "react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        {" "}
        &copy; Copyright {new Date().getFullYear()} by Planner Pro
      </p>
    </footer>
  );
}
