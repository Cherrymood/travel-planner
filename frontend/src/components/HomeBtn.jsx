import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Button from "./Button";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <Button
      className={styles.ctaLink}
      onClick={handleNavigation}
    >
      Home
    </Button>
  );
}
