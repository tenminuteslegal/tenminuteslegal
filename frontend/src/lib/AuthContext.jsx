/**
 * @typedef {Object} User
 * @property {string} [uid] - The user's unique ID
 * @property {string} [email] - The user's email address
 * @property {string} [displayName] - The user's display name
 * @property {string} [photoURL] - The user's profile photo URL
 * @property {'user' | 'admin'} [role] - The user's role
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {User|null} user - The current user object
 * @property {string|null} token - The authentication token
 * @property {() => void} loginWithGoogle - Function to initiate Google login
 * @property {() => void} handleAuthCallback - Function to handle auth callback
 * @property {(userData: User) => Promise<User>} saveUser - Function to save user data
 * @property {() => void} logout - Function to log out the user
 * @property {boolean} canProceed - Whether the user can proceed
 * @property {() => void} proceedHandler - Function to handle proceed action
 * @property {boolean} loginOpen - Whether the login modal is open
 * @property {(isOpen: boolean) => void} loginOpenHandler - Function to handle login modal state
 */

/** @type {import('react').Context<AuthContextValue>} */


import { createContext, useContext, useState } from "react";
;
const AuthContext = createContext();

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [canProceed, setCanProceed] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get(`${backendURL}/api/profile`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => setUser(res.data))
  //       .catch(() => logout());
  //   }
  // }, [token]);

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
