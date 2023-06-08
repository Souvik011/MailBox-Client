import { createSlice } from "@reduxjs/toolkit";

const initialSendState = { Triggerval: 0, sentItem: [], messageView: {} };

const SendSlice = createSlice({
  name: "mymail",
  initialState: initialSendState,
  reducers: {
    sendItemUpdateTrigger(state, action) {
      state.Triggerval = state.Triggerval + 1;
    },
    AddSenditemList(state, action) {
      const newItem = action.payload;

      state.sentItem.push(newItem);
    },
    addMessageViewinfo(state, action) {
      state.messageView = action.payload;
    },
  },
});
export const SendSliceAction = SendSlice.actions;
export default SendSlice;