import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token Response:", tokenResponse.access_token);

      if (tokenResponse.access_token) {
        localStorage.setItem("authToken", tokenResponse.access_token);
      }

      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        if (!userInfo.data) {
          console.error("User Info not found");
          return;
        }

        // const { email, username, password } = userInfo.data;

        // const payload = { username, email, password };

        // await axios.post(`${API_URL}`, payload, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // console.log("User Info:", userInfo.data);

        navigate("/app/cities");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
    flow: "popup",
  });

  return <button onClick={() => googleLogin()}>Login with Google</button>;
};

export default GoogleLoginButton;
