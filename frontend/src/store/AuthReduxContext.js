import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setToken,
  setCanProceed,
  setLoginOpen,
  logout,
} from "./authSlice";

// const backendURL = "http://localhost:5000";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, canProceed, loginOpen } = useSelector(
    (state) => state.auth
  );

  const loginWithGoogle = () => {
    window.location.href = `${backendURL}/auth/google`;
  };

  const handleAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("token");
    if (jwt) {
      dispatch(setToken(jwt));
      window.history.replaceState({}, document.title, "/");
    }
  };

  const proceedHandler = (proceed) => {
    dispatch(setCanProceed(proceed));
  };

  const loginOpenHandler = (isOpen) => {
    dispatch(setLoginOpen(isOpen));
  };

  const saveUser = async (userData) => {
    try {
      dispatch(setUser(userData));
      return userData;
    } catch (err) {
      console.error("Error saving user:", err);
      throw err;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    loginWithGoogle,
    handleAuthCallback,
    saveUser,
    logout: logoutUser,
    canProceed,
    proceedHandler,
    loginOpen,
    loginOpenHandler,
  };
};
