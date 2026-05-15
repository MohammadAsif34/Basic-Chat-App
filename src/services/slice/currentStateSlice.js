import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: "contact",
};

const currentStateSlice = createSlice({
  name: "currentState",
  initialState,
  reducers: {
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    clearCurrentState: () => initialState,
  },
});

export const { setCurrentState, clearCurrentState } = currentStateSlice.actions;
export default currentStateSlice.reducer;
