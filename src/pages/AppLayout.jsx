import AppNav from "../components/AppNav";
import Sidebar from "../components/SIdebar";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
    </div>
  );
}
