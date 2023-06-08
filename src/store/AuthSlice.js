import { createSlice } from "@reduxjs/toolkit";

const initialAuth = {
  islogin: false,
  signup: false,
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
    forgetVisible(state) {
      state.forgetPassowrd = !state.forgetPassowrd;
    },
    logout(state) {
      state.islogin = false;
      state.signup = false;
    },
    forgetPassowrd(state) {
      state.forgetPassowrd = false;
    }
  },
});
export const AuthAction = AuthSlice.actions;
export default AuthSlice;
