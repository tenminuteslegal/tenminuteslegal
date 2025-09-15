// Login.jsx
import { useAuth } from "../lib/AuthContext";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { onAuthUserCreate } from "firebase-functions/v2/auth";
import admin from "firebase-admin";

const adminEmails = ["example1@gmail.com", "keahnney01@gmail.com"];

const Login = () => {
  const { saveUser, loginOpenHandler } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      console.log("User:", result.user);
      console.log("result:", result);

      // Get the ID token
      const idToken = await result.user.getIdToken();

      // Send the token to your backend
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/auth/google/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: idToken }),
          }
        );

        const data = await response.json();
        console.log("Backend response:", data);
        if (data.error) {
          throw new Error(data.error);
        }

        const setUserRole = onAuthUserCreate(async (event) => {
          const { uid, email } = event.data;

          const role = adminEmails.includes(email) ? "admin" : "user";

          await admin.auth().setCustomUserClaims(uid, { role });

          console.log(`Assigned role=${role} to ${email}`);
        });

        console.log("App Token:", data.token);
        // Save the app token and user data
        localStorage.setItem("app_token", data.token);
        saveUser(data.user);
        loginOpenHandler(false);
      } catch (error) {
        console.error("Backend verification failed:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default Login;
