import { useState } from "react";
import axios from "axios";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button.jsx";
import GoogleBtn from "../components/GoogleBtn.jsx";

export default function Authorization() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/auth";

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || (!isLoginMode && !username)) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLoginMode ? "/login" : "/register";
      const payload = isLoginMode
        ? { email, password }
        : { username, email, password };

      const response = await axios.post(`${API_URL}${endpoint}`, payload);

      setMessage(
        response.data.message ||
          `${isLoginMode ? "Login" : "Signup"} successful!`
      );
      if (isLoginMode) {
        // Handle successful login actions here (e.g., save token, redirect, etc.)
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Network error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        {!isLoginMode && (
          <div className={styles.row}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required={!isLoginMode}
            />
          </div>
        )}

        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary" disabled={loading}>
            {loading
              ? isLoginMode
                ? "Logging in..."
                : "Signing up..."
              : isLoginMode
              ? "Login"
              : "Sign Up"}
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginMode((prev) => !prev);
              setMessage(""); // Clear any previous messages
            }}
          >
            {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
          </Button>
        </div>

        <div className={styles.row}>
          <GoogleBtn>Sign In with Google</GoogleBtn>
        </div>

        {message && (
          <p
            className={
              message.includes("successful") ? styles.success : styles.error
            }
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
