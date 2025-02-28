import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import SignOut from "./SignOut";
import React from "react";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <Logo className={styles.logo}/>

        <SignOut className={styles.signOut}/>
      </div>

      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}
