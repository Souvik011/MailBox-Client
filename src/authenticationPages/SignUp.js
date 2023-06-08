import React, { useRef } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Sendsignup, Sendlogin, SendUiVisible,SendForgetPassVisible } from "../store/Action-Trunk";
import classes from "./signup.module.css";
import { SendForgotPassward } from '../store/Action-Trunk';

const SignUp = () => {
  const disptach = useDispatch();
  const signup = useSelector((state) => state.auth.signup);
  const forgotValid  = useSelector((state) => state.auth.forgetPassowrd);
  const emailRef = useRef("");
  const passRef = useRef("");
  const confirmPassRef = useRef("");
  const forgotEmailRef =  useRef();

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    const obj = {
      email: emailValue,
      password: passValue,
    };
    if (emailValue === "" && passValue === "") {
      return;
    }
    if (
      emailValue.includes("@") &&
      emailValue.includes(".") &&
      passValue.length > 6 &&
      !signup 
    ) {
      disptach(Sendsignup(obj));
    }

    if (signup) {
      disptach(Sendlogin(obj));
    }
  };

  const buttonToggle = () => {
    disptach(SendUiVisible());
  };

  const buttonForgetToggle = () => {
    disptach(SendForgetPassVisible());
  };

  const forgotSubmitHandler = () => {
    disptach(SendForgotPassward(forgotEmailRef));
};

  return (
    <Container className="justify-content-center">
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          {!forgotValid && (<Form
            className={classes.signUp}
            style={{ backgroundColor: "skyblue" }}
            onSubmit={signUpSubmitHandler}
          >
            <h3
              style={{
                fontFamily: "sans-serif",
                fontSize: "2rem",
                fontStyle: "oblique",
              }}
            >
              {signup ? "Login" : "SignUp"}
            </h3>
            <Form.Group controlId="email" style={{ paddingRight: "2rem" }}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                style={{backgroundColor:"black" , color:"white" }}
                ref={emailRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" style={{ paddingRight: "2rem" }}>
              <Form.Control
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                style={{backgroundColor:"black" , color:"white" }}
                ref={passRef}
              ></Form.Control>
            </Form.Group>
            {!signup && (
              <Form.Group
                controlId="Confirm Password"
                style={{ paddingRight: "2rem" }}
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  style={{backgroundColor:"black" , color:"white" }}
                  ref={confirmPassRef}
                ></Form.Control>
              </Form.Group>
            )}
            <Button
              type="submit"
              variant="primary"
              className="justify-content-center"
            >
              {signup ? "Login" : "SignUp"}
            </Button>
            <Form.Group controlId="toggleButton" style={{backgroundColor:"whitesmoke", margin:"12px auto"}}>
              <Button
                className="justify-content-center"
                variant="info"
                onClick={buttonToggle}
                style={{ width: "auto" }}
              >
                {signup ? "Doesn't Have an Account ? SignUp" : "Already Have an Account ? Log In"}
              </Button>
              
            </Form.Group>
            
          </Form>)}
          {forgotValid && (
            <Form onSubmit={forgotSubmitHandler} style={{backgroundColor:"orange" , marginTop:"8rem" , textAlign:"center"}} >
            <label >Enter Registered Email </label>
              <Form.Group controlId="forgotPassowrd" >
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  style={{backgroundColor:"black" , color:"white" }}
                  ref={forgotEmailRef}
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" >Send Mail</Button>
              <Button variant="info" style={{alignItems:"center",textAlign:"center"}} onClick={buttonForgetToggle}>Log in</Button>
          </Form>
          )}
          
          <Form style={{alignItems:"center", textAlign:"center", backgroundColor:"blueviolet"}}>
              <Button
                className="justify-content-center"
                variant="secondary"
                onClick={buttonForgetToggle}
                style={{ width: "auto" }}
              >
                Forget Password
              </Button>
          </Form>
        </Col>
      </Row>
  

        
        
    </Container>
  );
};

export default SignUp;
