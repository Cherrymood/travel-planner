import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          Travel Planner keeps track of your adventures.
        </h1>
        <h2>
          A world map designed to track your footsteps across every city you’ve
          visited. This map becomes a living record of your adventures, ensuring
          you never forget your incredible experiences. Share your journeys with
          friends and showcase the many places you’ve wandered. Capture the
          essence of your travels, preserve memories, and inspire others to
          explore the world just like you have.
        </h2>
        <Link
          to={localStorage.getItem("authToken") ? "/app/cities" : "/login"}
          className="cta"
        >
          Start now
        </Link>
      </section>
    </main>
  );
}
