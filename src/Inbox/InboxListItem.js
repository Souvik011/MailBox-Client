import React  from "react";
import { Col, Container, ListGroup, Row , Button  } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { UpdateList,MsgViewInfo,DeleteMail } from "../store/Mail-Trunk";
import { Link } from "react-router-dom";

const InboxListItem = (props) => {
  const Dispatch = useDispatch();

  let Readreceipt;
  if (!props.readreceipt) {
    Readreceipt = "readreceipt";
  }
  const ListItemHandler = () => {
    Dispatch(MsgViewInfo(props.id));
    if (!props.readreceipt) {
      Dispatch(UpdateList(props))
      return;
    }
  };

  const deleteHandler = () => {
    Dispatch(DeleteMail(props.id));
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
                <div className={`${Readreceipt}`}>.</div>
                <Link to="mailview">{props.email} {props.subject}</Link>
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
export default InboxListItem;