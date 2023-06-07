import React  from "react";
import { Col, Container, ListGroup, Row  } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { UpdateList,MsgViewInfo } from "../store/Mail-Trunk";
import { Link } from "react-router-dom";

const InboxListItem = (props) => {
  const { messageId } = useParams();
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
  }  
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
                <Link to="mailview">{props.email}</Link>
              </div>
            </Col>

            
          </Row>
        </Container>
      </ListGroup.Item>
    </>
  );
};
export default InboxListItem;