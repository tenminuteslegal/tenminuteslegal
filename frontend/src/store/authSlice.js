import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("app_token"),
  canProceed: false,
  loginOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("app_token", action.payload);
      } else {
        localStorage.removeItem("app_token");
      }
    },
    setCanProceed: (state, action) => {
      state.canProceed = action.payload;
    },
    setLoginOpen: (state, action) => {
      state.loginOpen = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("app_token");
    },
  },
});

export const { setUser, setToken, setCanProceed, setLoginOpen, logout } =
  authSlice.actions;
export default authSlice.reducer;
