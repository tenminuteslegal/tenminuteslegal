
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [canProceed, setCanProceed] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`${backendURL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  // Redirect user to Google OAuth
  const loginWithGoogle = () => {
    window.location.href = `${backendURL}/auth/google`;
  };

  // Handle OAuth callback (after redirect from Google)
  const handleAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");
    if (jwt) {
      localStorage.setItem("token", jwt);
      setToken(jwt);
      window.history.replaceState({}, document.title, "/");
    }
  };

  const proceedHandler = () => {
    setCanProceed(true);
  };
  const loginOpenHandler = (isOpen) => {
    setLoginOpen(isOpen);
  };

  // ✅ Method to save/update user
  const saveUser = async (userData) => {
    // if (!token) return;

    try {
      
      setUser(userData); // update local user state
      return userData;
    } catch (err) {
      console.error("Error saving user:", err);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginWithGoogle,
        handleAuthCallback,
        saveUser, // ✅ exposed here
        logout,
        canProceed,
        proceedHandler,
        loginOpen,
        loginOpenHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
