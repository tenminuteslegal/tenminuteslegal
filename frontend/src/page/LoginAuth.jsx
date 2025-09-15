// Login.jsx
import { useAuth } from "../lib/AuthContext";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const { saveUser, loginOpenHandler } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      console.log("User:", result.user);
      console.log("result:", result);

      // You can also get Google Access Token
      
      const token = result.user.accessToken;
      console.log("Google Access Token:", token);
      saveUser(result.user);
      loginOpenHandler(false);


      // Send the ID token to your backend for verification and to get your app's JWT

      localStorage.setItem("app_token", token);

    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default Login;
