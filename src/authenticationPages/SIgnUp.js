import React, { useRef, useState } from "react";
import classes from "./Signup.module.css";


const SignUp = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const confirmPassRef = useRef("");

  const [emailValid, setEmailValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [confirmPassValid, setConfirmPassValid] = useState(false);

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    const confirmPassValue = confirmPassRef.current.value;
    if (
      emailValue.includes("@") &&
      emailValue.includes(".") &&
      passValue.length > 6 &&
      confirmPassValue === passValue
    ) {
      setEmailValid(false);
      setPassValid(false);
      setConfirmPassValid(false);

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKhYLI8muDF7nwER_abab3OcVOKw9zQa0",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: confirmPassValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.email);
        emailRef.current.value = "";
        passRef.current.value = "";
        confirmPassRef.current.value = "";
        alert("USer is SuccessFully Siggned In");
      } else {
        alert(data.error.message);
      }
    } else {
      if (!emailValue.includes("@") || !emailValue.includes(".")) {
        setEmailValid(true);
      }
      if (passValue.length < 6) {
        setPassValid(true);
      }
      if (confirmPassValue !== passValue) {
        setConfirmPassValid(true);
      }
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={signUpSubmitHandler} className={classes.signUp}>
        <div>
          <h3 style={{backgroundColor:"blue" , width:"10rem" , textAlign:"center"}}>Sign Up</h3>
        </div>
        <div>
          <input
            id="emailId"
            placeholder="Email"
            type="text"
            ref={emailRef}
          ></input>
          {emailValid && <p>Please Enter Valid Email</p>}
          <input
            id="passwordId"
            placeholder="Password"
            type="password"
            ref={passRef}
          />
          {passValid && <p>Please Enter Valid Password</p>}
          <input
            id="confirmPwdId"
            placeholder="Confirm Password"
            type="password"
            ref={confirmPassRef}
          />
          {confirmPassValid && <p>Please Match the Password</p>}
        </div>
        <button>Sign Up</button>
        
      </form>
      
        
      
    </React.Fragment>
  );
};

export default SignUp;
