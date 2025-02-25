import { useState } from "react";
import React from "react";
import axios from "axios";
import PageNav from "../components/PageNav.jsx";
import styles from "./Login.module.css";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleBtn.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Authorization() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_URL = import.meta.env.VITE_BASE_URL;

  const showNotification = (message, type = "error") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); // Clear notification after 3 seconds
  };

  async function handleSubmit(e) {
    const isGoogleLogin = false;

    e.preventDefault();

    if (!email || !password || (!isLoginMode && !username)) {
      showNotification("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = isLoginMode
        ? { email, password, isGoogleLogin }
        : { username, email, password, isGoogleLogin };

      const response = await axios.post(`${API_URL}/auth`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        showNotification("Login successful!", "success");
      }

      navigate("/app/cities");
    } catch (error) {
      setLoading(false);

      if (error.response) {
        showNotification(
          `Server responded with an error: ${
            error.response.data.error || "Unknown error"
          }`,
          "error"
        );
      } else if (error.request) {
        showNotification("No response received from the server.", "error");
      } else {
        showNotification(
          `Error setting up the request: ${error.message}`,
          "error"
        );
      }
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.form}>
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
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>
        </form>
        {notification && (
          <div className={`${styles.notification} ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>
    </main>
  );
}
