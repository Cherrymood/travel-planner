import { useState } from "react";
import axios from "axios";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button.jsx";
import GoogleBtn from "../components/GoogleBtn.jsx";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9000/login", {
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
      <form className={styles.form} onSubmit={handleLogin}>
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
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="back">Sign up</Button>
        </div>
        <div className={styles.row}>
          <GoogleBtn className={styles.primary}>Sign In with Google</GoogleBtn>
        </div>
        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
