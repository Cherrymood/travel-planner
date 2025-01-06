
import Sidebar from "../components/SIdebar";
import Map from "../components/Map";
import AppNav from "../components/AppNav";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <AppNav />
      <h1>LayOut</h1>
    </div>
  );
}
