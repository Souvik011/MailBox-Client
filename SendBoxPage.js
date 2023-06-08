import React, { useEffect } from "react";
import "../Inbox/Inbox.css";
import { Container, Row, Col, ListGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import SendBoxList from "./SendBoxList";
import InboxNav from "../Inbox/InboxNav";
import { useSelector, useDispatch } from "react-redux";
import { getmailHandler } from "../store/Mail-Trunk";



const SendBoxPage = () => {

    const Items = useSelector((state) => state.mail.items);
    const mail = localStorage.getItem("mailid");
    let Unreadmessage = 0;
    Items.map((item) => {
      if (item.readreceipt === false) {
        return Unreadmessage++;
      }
      return Unreadmessage;
    });

    const Disptach = useDispatch();
    useEffect(() => {
      Disptach(getmailHandler());
    }, [mail]);
    // useEffect(() => {
    //   Disptach(getmailHandler());
    // }, [Count]);
    
     
  return (
    <>
      <InboxNav></InboxNav>
      <Container fluid="true">
        <Row style={{ height: "600px" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
              <Link to="/compose">
                <ListGroup.Item className="m-1 bg-" action>
                  Compose
                </ListGroup.Item>
              </Link>
              <Link to="/inboxpage"><ListGroup.Item className="m-1 bg-" action>
                <div className="inbox-count">
                  <p>Inbox</p> <h6>{Unreadmessage}</h6>
                </div>
              </ListGroup.Item></Link>
              <ListGroup.Item className="m-1" action>
                SendMail
              </ListGroup.Item>
              <ListGroup.Item className="m-1" action>
                DraftBox
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={10} className="">
          <SendBoxList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SendBoxPage;
