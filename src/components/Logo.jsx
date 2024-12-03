import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="Travel logo" className={styles.logo} />
    </Link>
  );
}
