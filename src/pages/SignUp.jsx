import { useState } from "react";
import axios from "axios";
import PageNav from "../components/PageNav.jsx";
import styles from "./Login.module.css";
import Button from "../components/Button.jsx";

export default function SignUp() {
  const [email, setEmail] = useState("jack@example.com");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("qwerty");
  const [message, setMessage] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message); // Server error message
      } else {
        setMessage("Network error. Please try again later.");
      }
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSignUp}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary">Sign up</Button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
