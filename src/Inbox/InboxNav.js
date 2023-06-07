import React from "react";
import { Container, Form, Button,Navbar,Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import './Inbox.css';

const InboxNav = () => {
  return (
    <>
       <Navbar bg="success" fluid>
        <Container fluid>
          <img
            className="thum-img"
            alt="Img"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png"
          ></img>

          <Nav>
            <Link to="/inboxpage" style={{color:"black" }}>Home</Link>
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
        </Container>
      </Navbar>
    </>
  );
};
export default InboxNav;