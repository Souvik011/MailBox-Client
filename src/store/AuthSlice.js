import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { islogin:localStorage.getItem("islogin"), signup: false, forgetPassowrd: false , email: localStorage.getItem('mailid'), idToken:localStorage.getItem('id') , data: []};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    SignUp(state,action) {
        state.islogin = true ;
        state.data.push(action.payload);
    },
    Login(state, action) {},
    UiVisible(state) {
        state.islogin = !state.islogin;
    }
  },
});
export const AuthAction = AuthSlice.actions;
export default AuthSlice;