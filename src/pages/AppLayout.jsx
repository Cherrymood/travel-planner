import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <AppNav />
      <h1>LayOut</h1>
    </div>
  );
}
