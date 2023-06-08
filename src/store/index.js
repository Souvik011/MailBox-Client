import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import MailSlice from "./MailSlice";
import SendSlice from "./SendMailSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        mail: MailSlice.reducer,
        send: SendSlice.reducer,
      },
});

export default store;