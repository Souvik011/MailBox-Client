import { createSlice } from "@reduxjs/toolkit";

const initialval = { sendMail: false };

const MailSlice = createSlice({
  name: "mail",
  initialState: initialval,
  reducers: {
    setSentData(state, action) {
      state.sendMail = !state.sendMail;
    },
  },
});
export const MailSliceAction = MailSlice.actions;
export default MailSlice;