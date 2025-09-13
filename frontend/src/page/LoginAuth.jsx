// src/LoginPage.jsx
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../lib/AuthContext.jsx";


// const BACKEND_URL =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
// const CLIENT_ID =
//   process.env.REACT_APP_GOOGLE_CLIENT_ID ||
//   "1086949398176-k2r6ujkc99378urjafp5uoeu83gpmsu5.apps.googleusercontent.com";
const BACKEND_URL = "http://localhost:5000";
const CLIENT_ID =  "1086949398176-k2r6ujkc99378urjafp5uoeu83gpmsu5.apps.googleusercontent.com";

export default function LoginAuth() {
  const [user, setUser] = useState(null);
  const { saveUser, loginOpenHandler } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    const googleIdToken = credentialResponse?.credential;
    if (!googleIdToken) {
      console.error("No credential returned");
      return;
    }

    try {
      // Send the Google ID token to backend for verification
      const res = await fetch(`${BACKEND_URL}/auth/google/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleIdToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Backend verification failed:", data);
        return;
      }

      // data.token is your app JWT — store it and set user
      localStorage.setItem("app_token", data.token);
      loginOpenHandler()
      saveUser(data.user);
      setUser(data.user);
      console.log("Logged in user:", data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFailure = (err) => {
    console.error("Google login failed", err);
  };

  const fetchProtected = async () => {
    const token = localStorage.getItem("app_token");
    const res = await fetch(`${BACKEND_URL}/api/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    console.log("Protected response", json);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        
      </div>
    </GoogleOAuthProvider>
  );
}
