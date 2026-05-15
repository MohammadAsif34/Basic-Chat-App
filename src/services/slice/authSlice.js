import { createSlice } from "@reduxjs/toolkit";
const token = sessionStorage.getItem("token");

const initialState = {
  token: token || null,
  authenticated: !!token,
  system: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
      state.authenticated = true;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
    systemChange: (state, action) => {
      state.system = action.payload;
    },
  },
});

export const { setCredentials, logout, systemChange } = authSlice.actions;
export default authSlice.reducer;
