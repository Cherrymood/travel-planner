import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import React from "react";
import SignOut from "./SignOut";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li> <Logo /></li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <SignOut />
      </ul>
    </nav>
  );
}
