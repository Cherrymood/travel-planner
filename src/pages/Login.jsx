import { useState } from "react";
import React from "react";
import axios from "axios";
import PageNav from "../components/PageNav";
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
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // console.log(clientId);

  const API_URL = "http://localhost:3000/auth";

  async function handleSubmit(e) {
    const isGoogleLogin = false;

    e.preventDefault();

    if (!email || !password || (!isLoginMode && !username)) {
      return;
    }

    setLoading(true);

    try {
      const payload = isLoginMode
        ? { email, password, isGoogleLogin }
        : { username, email, password, isGoogleLogin };

      const response = await axios.post(`${API_URL}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
      }

      setErrorMessage("");

      navigate("/app/cities");
    } catch (error) {
      setLoading(false);

      if (error.response) {
        setErrorMessage(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        setErrorMessage("No response received from the server:", error.request);
      } else {
        setErrorMessage("Error setting up the request:", error.message);
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
        {errorMessage && (
          <div className={styles.errorPopup}>{errorMessage}</div>
        )}
      </div>
    </main>
  );
}
