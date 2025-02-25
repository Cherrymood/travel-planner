import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import React from "react";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <Logo />
      </NavLink>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {localStorage.getItem("authToken") && (
            <NavLink
              to="/"
              className={styles.ctaLink}
              onClick={() => {
                localStorage.removeItem("authToken");
              }}
            >
              Sign Out
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
