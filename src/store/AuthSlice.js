import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
  islogin: localStorage.getItem("islogin"),
  signup: localStorage.getItem("signup"),
  forgetPassowrd: false,
  email: null ,
  idToken: null,
  data: [],
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    SignUp(state, action) {
      localStorage.setItem("signup" , true);
      state.signup = true ;
      state.email = localStorage.getItem("mailid");
      state.idToken =  localStorage.getItem("id");
      state.data.push(action.payload);
    },
    Login(state, action) {
      localStorage.setItem("islogin" , true);
      state.email = localStorage.getItem("mailid");
      state.idToken =  localStorage.getItem("id");
      state.islogin = true;
    },
    UiVisible(state) {
      localStorage.setItem("signup" ,!state.signup);
      state.signup = !state.signup;
      
    },
  },
});
export const AuthAction = AuthSlice.actions;
export default AuthSlice;
