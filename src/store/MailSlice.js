import { createSlice } from "@reduxjs/toolkit";

const initialval = { sendMail: false, getMail: false, items: [],count: 0,messageView: {}, sentItem:[]};

const MailSlice = createSlice({
  name: "mail",
  initialState: initialval,
  reducers: {
    setSentData(state, action) {
      state.sendMail = !state.sendMail;
      state.count = state.count+1;

    },
    setGetMail(state, action) {
      console.log("getmail");
    },
    addItem(state,action) {
      state.items = action.payload;
      state.sentItem = action.payload;
      console.log(state.unread);
    },
    updateItem(state, action) {
      state.items = action.payload ;
      state.sentItem = action.payload;
      state.count = state.count+1;
    },
    addMessageViewinfo(state, action) {
      state.messageView = action.payload;
  },
}});
export const MailSliceAction = MailSlice.actions;
export default MailSlice;