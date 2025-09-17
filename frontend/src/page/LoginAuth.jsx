// Login.jsx
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../store/AuthReduxContext";

// const BACKEND_URL =  "http://localhost:5000";
const BACKEND_URL = "https://one0minuteslegal.onrender.com" || "http://localhost:5000";


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
     const response = await fetch(`${BACKEND_URL}/auth/google/verify`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ token: idToken }),
       }
     );
    

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


  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default Login;
