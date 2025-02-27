import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";

export default function SignOut() {

  return (
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
  );
}
