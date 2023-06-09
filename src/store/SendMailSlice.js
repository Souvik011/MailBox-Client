import { createSlice } from "@reduxjs/toolkit";

const initialSendState = { Triggerval: 0, sentItem: [], messageView: {}, reply:localStorage.getItem("mailid"),replymode:false };

const SendSlice = createSlice({
  name: "mymail",
  initialState: initialSendState,
  reducers: {
    sendItemUpdateTrigger(state, action) {
      state.Triggerval = state.Triggerval + 1;
    },
    AddSenditemList(state, action) {
      state.sentItem = action.payload;

     
    },
    addMessageViewinfo(state, action) {
      state.messageView = action.payload;
    },
    updateSendItem(state, action) {
      state.items = action.payload ;
    },
    reply(state,action) {
      state.reply = action.payload
    },
    toggleReply (state) {
      state.replymode = !state.replymode;
    }
  },
});
export const SendSliceAction = SendSlice.actions;
export default SendSlice;