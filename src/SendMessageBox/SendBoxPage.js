import React, { useEffect } from "react";
import "../Inbox/Inbox.css";
import { Container, Row, Col, ListGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import SendBoxList from "./SendBoxList";
import InboxNav from "../Inbox/InboxNav";
import { useSelector, useDispatch } from "react-redux";
import { getSendMailList } from "../store/Mail-Trunk";



const SendBoxPage = () => {

    const Items = useSelector((state) => state.mail.items);
    const sendItem = useSelector((state) => state.send.sentItem);
    const mail = localStorage.getItem("mailid");
    let Unreadmessage = 0;
    Items.map((item) => {
      if (item.readreceipt === false) {
        return Unreadmessage++;
      }
      return Unreadmessage;
    });

    let sendCount = 0 ;
    sendItem.map((item) => {
      if (item.readreceipt === false) {
        return sendCount++;
      }
      return sendCount;
    });


    const Disptach = useDispatch();
    useEffect(() => {
      Disptach(getSendMailList());
    }, [mail,Disptach]);

    useEffect(() => {
      const intervelid = setInterval(() => {
        console.log("setintervelid", intervelid);
        Disptach(getSendMailList());
      }, 2000);
  
      return () => {
        console.log("clearintervalid", intervelid);
        clearInterval(intervelid);
      };
    });
    
    
     
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
              
              <ListGroup.Item className="m-1" action>
              <div className="inbox-count">
              <p>Inbox</p> <h6>{sendCount}</h6>
                </div>
              </ListGroup.Item>
              <Link to="/sendbox"><ListGroup.Item className="m-1 bg-" action>
                <div className="inbox-count">
                  <p>SendMail</p> <h6>{Unreadmessage}</h6>
                </div>
              </ListGroup.Item></Link>
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
