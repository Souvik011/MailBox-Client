import React from "react";
import { Button, Card } from "react-bootstrap";
// import CloseButton from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { reply ,ToggleReply} from "../store/Mail-Trunk";

const ViewMessage = (props) => {
  let messageView = useSelector((state) => state.mail.messageView);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(messageView, " mymailmessageView");
  
  const replybuttonHandler = () => {
    Dispatch(reply(messageView.email));
    Dispatch(ToggleReply());
    navigate("/compose");
  };
  return (
    <React.Fragment>
      <Card className="mt-3">
        <Card.Header>
        <h3>{messageView.subject}</h3>
        </Card.Header>
        <Card.Body>
        <p className="mb-5">{messageView.text}</p>
        </Card.Body>
        <Card.Footer>
        <h6>{messageView.email}</h6>
          <Button onClick={replybuttonHandler}>Reply</Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default ViewMessage;