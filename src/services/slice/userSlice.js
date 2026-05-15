import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  contacts: [],
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
    deleteContact: (state, action) => {
      const d = state.contacts.filter((id) => id == action.payload);
      console.log(d);
      state.contacts = d;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    acceptRequest: (state, action) => {
      state.user.requestReceive = state.user.requestReceive.filter(
        (user) => user._id !== action.payload,
      );
    },
    sentRequest: (state, action) => {
      state.user.requestSent.push(action.payload);
    },
  },
});
export const {
  setUser,
  clearUser,
  updateProfile,
  verifyUser,
  deleteContact,
  addContact,
  acceptRequest,
  sentRequest,
} = userSlice.actions;
export default userSlice.reducer;
