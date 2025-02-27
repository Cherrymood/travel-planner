import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Button from "./Button";

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <li>
      {localStorage.getItem("authToken") && (
        <Button
          className={styles.ctaLink}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      )}
    </li>
  );
}
