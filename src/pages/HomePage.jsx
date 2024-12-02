import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function HomePage() {
  return (
    <div>
      <PageNav />
      <h1>Home Page</h1>
      <Link to="app">AppLayOut </Link>
    </div>
  );
}
