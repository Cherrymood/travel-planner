import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <NavLink to="/">
      <img src="/logo.png" alt="logo" className={styles.logo} />
    </NavLink>
  );
}

export default Logo;
