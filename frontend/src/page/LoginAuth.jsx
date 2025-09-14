// src/LoginPage.jsx
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginAuth() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      console.log(data)
      // Handle successful login
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <h2>Login with Google</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
