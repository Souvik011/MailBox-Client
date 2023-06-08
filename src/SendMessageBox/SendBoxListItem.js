import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { SendSliceAction } from "../store/SendMailSlice";

const SendBoxListItem = (props) => {
  const Dispatch = useDispatch();
  console.log("deatails/", props);
  let Readreceipt;
  if (!props.readreceipt) {
    Readreceipt = "readreceipt";
  }
  const ListItemHandler = () => {
    Dispatch(SendSliceAction.addMessageViewinfo(props));
  };
  const deleteHandler = () => {
    console.log("sendmeeage page");
  };
  return (
    <>
      <ListGroup.Item
        id={props.id}
        className="m-.3 "
        variant="primary"
        key={props.id}
      >
        <Container>
          <Row>
            <Col className="pb-3">
              <div className="readreceiptbox" onClick={ListItemHandler}>
                <Link to="sentmailview">{props.email}</Link>
              </div>
            </Col>

            <Col md={1} style={{ height: "20px" }}>
              <Button variant="secondary" onClick={deleteHandler}>
                delete
              </Button>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </>
  );
};
export default SendBoxListItem;