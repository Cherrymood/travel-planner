import styles from "./Logo.module.css";
import React from "react";

function Logo() {
  return <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />;
}

export default Logo;
