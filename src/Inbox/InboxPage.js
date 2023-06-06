import React from "react";
import "./Inbox.css";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import {Link} from 'react-router-dom';
import InboxList from "./InboxList";
import InboxNav from "./InboxNav";
// import TextEditor from "../TextEditor/TextEditor";
import { getmailHandler } from "../store/Mail-Trunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const InboxPage = () => {
  const Disptach = useDispatch();
  useEffect(() => {
    Disptach(getmailHandler());
  }, [Disptach]);
  return (
    <>
      <InboxNav></InboxNav>
      <Container fluid>
        <Row style={{ height: "600px" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
            <Link to="/compose"><ListGroup.Item className="m-1 bg-" action>
                Compose
              </ListGroup.Item></Link>
              <ListGroup.Item className="m-1 bg-" action>
                Inbox
              </ListGroup.Item>
              <ListGroup.Item className="m-1" action>
                SendMail
              </ListGroup.Item>
              <ListGroup.Item className="m-1" action>
                DraftBox
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={10} className="">
            <InboxList></InboxList>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InboxPage;