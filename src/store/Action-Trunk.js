import { AuthAction } from "./AuthSlice";

const loginURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKhYLI8muDF7nwER_abab3OcVOKw9zQa0";
const signupUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKhYLI8muDF7nwER_abab3OcVOKw9zQa0";

  export const Sendsignup = (obj) => {
    return async (dispatch) => {
      const sendingAuth = async () => {
        const response = await fetch(signupUrl, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        if (data.error) {
          alert(data.error.message);
          throw new Error(data.error.message);
        }
  
        return data;
      };
      try {
        const data = await sendingAuth();
        dispatch(AuthAction.SignUp(data));
      } catch (error) {
        alert(error.message);
      }
    };
  };
  
  export const Sendlogin = (obj) => {
    return async (dispatch) => {
      const sendingloginAuth = async () => {
        const response = await fetch(loginURL, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        if (data.error) {
          alert(data.error.message);
          throw new Error(data.error.message);
        }
  
        return data;
      };
      try {
        const data = await sendingloginAuth();
        const id = await data.idToken;
        const email =  await obj.email;
        localStorage.setItem("id", data.idToken);
        localStorage.setItem("islogin", "true");
        localStorage.setItem("mailid", obj.email);
         console.log(id);
        dispatch(AuthAction.Login(id,email));
      } catch (error) {
        alert(error);
      }
      
    };
  };

  export const SendUiVisible = () => {
    return async (dispatch) => {
        dispatch(AuthAction.UiVisible());
    };
  };