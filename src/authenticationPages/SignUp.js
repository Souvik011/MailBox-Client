import React, { useRef } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Sendsignup, Sendlogin, SendUiVisible } from "../store/Action-Trunk";
import classes from "./signup.module.css";

const SignUp = () => {
  const disptach = useDispatch();
  const islogin = useSelector((state) => state.auth.islogin);
  const emailRef = useRef("");
  const passRef = useRef("");
  const confirmPassRef = useRef("");

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
      !islogin
    ) {
      confirmPassRef.current.value === passValue &&
      disptach(Sendsignup(obj));
    }

    if (islogin) {
      disptach(Sendlogin(obj));
    }
  };

  const buttonToggle = () => {
    disptach(SendUiVisible());
  };
  return (
    <Container className="justify-content-center">
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <Form
            className={classes.signUp}
            style={{ padding: "3rem auto", backgroundColor: "skyblue" }}
            onSubmit={signUpSubmitHandler}
          >
            <h3
              style={{
                fontFamily: "sans-serif",
                fontSize: "2rem",
                fontStyle: "oblique",
              }}
            >
              {islogin ? "Login" : "SignUp"}
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
            {!islogin && (
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
              {islogin ? "Login" : "SignUp"}
            </Button>
            <Form.Group controlId="toggleButton" style={{backgroundColor:"whitesmoke", margin:"12px auto"}}>
              <Button
                className="justify-content-center"
                variant="info"
                onClick={buttonToggle}
                style={{ width: "auto" }}
              >
                {islogin ? "Doesn't Have an Account ? SignUp" : "Already Have an Account ? Log In"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
