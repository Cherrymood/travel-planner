
import Sidebar from "../components/SIdebar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
