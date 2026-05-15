import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/slice/authSlice.js";
import userReducer from "./services/slice/userSlice.js";
import stateReducer from "./services/slice/currentStateSlice.js";
import currentChatReducer from "./services/slice/currentChatSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    state: stateReducer,
    currentChat: currentChatReducer,
  },
});
