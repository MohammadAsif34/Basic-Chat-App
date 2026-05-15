import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  contacts: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.contacts = action.payload.contacts;
    },
    clearUser: () => initialState,
    updateProfile: (state, action) => {
      state.user.name = action.payload.name;
      state.user.bio = action.payload.bio;
    },
    verifyUser: (state) => {
      state.user.passwordVerified = true;
    },
  },
});
export const { setUser, clearUser, updateProfile, verifyUser } =
  userSlice.actions;
export default userSlice.reducer;
