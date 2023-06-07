import React, { useEffect } from "react";
import "./Inbox.css";
import { Container, Row, Col, ListGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import InboxList from "./InboxList";
import InboxNav from "./InboxNav";
import { getmailHandler  } from "../store/Mail-Trunk";
import { useSelector, useDispatch } from "react-redux";



const InboxPage = () => {

    const Items = useSelector((state) => state.mail.items);
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
    }, []);

    
     
  return (
    <>
      <InboxNav></InboxNav>
      <Container fluid>
        <Row style={{ height: "600px" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
              <Link to="/compose">
                <ListGroup.Item className="m-1 bg-" action>
                  Compose
                </ListGroup.Item>
              </Link>
              <ListGroup.Item className="m-1 bg-" action>
                <div className="inbox-count">
                  <p>Inbox</p> <h6>{Unreadmessage}</h6>
                </div>
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
          <InboxList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InboxPage;
