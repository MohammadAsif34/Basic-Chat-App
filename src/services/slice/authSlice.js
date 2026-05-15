import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
console.log("token", token);

const initialState = {
  token: token || null,
  authenticated: !!token,
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
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
