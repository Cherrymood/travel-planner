import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p> List of cities</p>

      <Footer />
    </div>
  );
}
