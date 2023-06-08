import React from "react";
import { Container, Form, Button,Navbar,Nav} from "react-bootstrap";
import {Link,useNavigate} from "react-router-dom";
import './Inbox.css';
import {AuthAction} from '../store/AuthSlice';
import { useDispatch } from "react-redux";

const InboxNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(AuthAction.logout());
    navigate("./");
  };
  return (
    <>
       <Navbar bg="success" fluid="true">
        <Container fluid="true" style={{display:"flex",justifyContent:"space-around"}}>
          <img
            className="thum-img"
            alt="Img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png"
          ></img>

          <Nav>
            <Link to="/inboxpage" style={{color:"black" }}><Button variant="primary">Home</Button></Link>
          </Nav>
        
          <Form className="d-flex pl-5" style={{ width: "600px" }}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-7"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
          <Button variant="danger" onClick={logoutHandler}> Log Out</Button>
        </Container>
      </Navbar>
    </>
  );
};
export default InboxNav;