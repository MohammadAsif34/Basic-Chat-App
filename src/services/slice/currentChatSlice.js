import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: null,
  messages: [],
};

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    clearCurrentChat: () => initialState,
    fetchedMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    replaceTempMessage: (state, action) => {
      const index = state.messages.findIndex(
        (msg) => msg.tempId === action.payload.tempId,
      );
      if (index !== -1) state.messages[index] = action.payload;
      else state.messages.push(action.payload);
    },
  },
});

export const {
  setCurrentChat,
  clearCurrentChat,
  fetchedMessages,
  addMessage,
  replaceTempMessage,
} = currentChatSlice.actions;
export default currentChatSlice.reducer;
