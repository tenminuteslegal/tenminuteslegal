// Login.jsx
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      console.log("User:", result.user);

      // You can also get Google Access Token
      const credential = googleProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("Google Access Token:", token);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default Login;
