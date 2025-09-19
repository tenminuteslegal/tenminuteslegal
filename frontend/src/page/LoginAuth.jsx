// Login.jsx
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../store/AuthReduxContext";
import google_icon from "../assets/google-icon.png";

// const BACKEND_URL =  "http://localhost:5000";
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_DEV;

const Login = () => {
  const { saveUser, loginOpenHandler } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Get Firebase ID token (not accessToken)
      const idToken = await result.user.getIdToken(); // ✅
      console.log("ID Token:", idToken);

      // Save temporarily in localStorage (app will later replace with backend JWT)
      localStorage.setItem("firebase_token", idToken);

      const resultUser = {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        avatar: result.user.photoURL,
      };

      // Send the token to backend for verification
      const response = await fetch(`${BACKEND_URL}/auth/google/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.error) throw new Error(data.error);

      // ✅ Store backend-issued app token instead
      localStorage.setItem("app_token", data.token);
      saveUser(resultUser);
      loginOpenHandler(false);
      saveUser(data.user);
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };
  return (
    <button onClick={handleGoogleLogin} className="bg-black flex items-center justify-center space-x-4 text-white px-[20px] py-2 rounded-[10px] hover:bg-gray-800 transition">
      <img src={google_icon} alt="Google icon" className="w-[40px] h-[40px]" /><span>Sign in with Google</span>
    </button>
  );
};

export default Login;
