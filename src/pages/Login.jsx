import { useState } from "react";
import axios from "axios";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button.jsx";
import GoogleBtn from "../components/GoogleBtn.jsx";
import { useNavigate } from "react-router-dom";

export default function Authorization() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/auth";

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || (!isLoginMode && !username)) {
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLoginMode ? "/login" : "/register";
      const payload = isLoginMode
        ? { email, password }
        : { username, email, password };

      const response = await axios.post(`${API_URL}${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token } = response.data;

      if (isLoginMode && token) {
        localStorage.setItem("authToken", token);

        console.log("Token saved:", token);
      }
      navigate("/app/cities");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  async function handleGoogle(e) {
    e.preventDefault();
    console.log("Google");
    setLoading(true);

    try {
      // const payload = { googleId: id, email, username: name };

      const response = await axios.post(
        `${API_URL}/google`, // Corrected URL
        {}, // Body (empty in this case)
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // Log the response data
    } catch (error) {
      console.error("Google sign-in error:", error);
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
            }}
          >
            {isLoginMode ? "Switch to Sign Up" : "Switch to Login"}
          </Button>
        </div>
        <GoogleBtn onClick={handleGoogle}>
          {loading ? "Signing in with Google..." : "Sign In with Google"}
        </GoogleBtn>
      </form>
    </main>
  );
}
