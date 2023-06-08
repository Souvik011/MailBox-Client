import React , {useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Row, Col, Container, Card, Button , ListGroup } from "react-bootstrap";
import {Link} from "react-router-dom";
import { Form } from "react-bootstrap";
import "./TextEditor.css";
import { useDispatch,useSelector } from "react-redux";
import InboxNav from "../Inbox/InboxNav";
import { sendMailHandler } from "../store/Mail-Trunk";

const TextEditor = () => {
    const Disptach = useDispatch();
    const Items = useSelector((state) => state.mail.items);
    let Unreadmessage = 0;
    Items.map((item) => {
      if (item.readreceipt === false) {
        return Unreadmessage++;
      }
      return Unreadmessage;
    });
    const [editorState,setEditorState] = useState(undefined);
  const Enteredemail = React.createRef(null);
  const Enteredsubject = React.createRef(null);
  const Enteredtext = React.createRef(null);
  const FormsubmitHandler = (event) => {
    event.preventDefault();
    const mailData = {
      email: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredtext.current.value,
      readreceipt:false
    };
    Disptach(sendMailHandler(mailData));
    console.log(mailData, "TextEditing-FormsubmitHandler");
  };

  const updateTextDescription = (editorState) => {
    setEditorState(editorState);
  };
  return (
    <React.Fragment>
      <InboxNav />
      <Container fluid>
        <Row>
        <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
            <Link to="/compose"><ListGroup.Item className="m-1 bg-" action>
                Compose
              </ListGroup.Item></Link>
              <Link to="/inboxpage" ><ListGroup.Item className="m-1 bg-" action>
              <div className="inbox-count">
                  <p>Inbox</p> <h6>{Unreadmessage}</h6>
                </div>
              </ListGroup.Item></Link>
              <Link to="/sendbox" ><ListGroup.Item className="m-1" action>
                SendMail
              </ListGroup.Item></Link>
              <ListGroup.Item className="m-1" action>
                DraftBox
              </ListGroup.Item>
            </ListGroup>
          </Col>
          
          <Col xs={10}>
            <Form className="pt-4" onSubmit={FormsubmitHandler}>
              <Card style={{ width: "auto" }} border="success">
                <Card.Body className="colours">
                  <Form.Group controlId="email" style={{display:"table" , width:"auto"}}>
                    <Form.Label style={{float:"left",width:"auto"}}>To :</Form.Label>
                    <Form.Control style={{float:"left",width:"56rem",height:"2rem" , marginLeft:"1rem"}}
                      size="sm"
                      type="email"
                      placeholder="Enter Email"
                      ref={Enteredemail}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="subject" style={{display:"table" , width:"auto" , marginTop:"2rem"}}>
                    <Form.Label style={{float:"left",width:"auto"}}>Subject : </Form.Label>
                    <Form.Control style={{float:"left",width:"54rem",marginLeft:"1rem"}}
                      type="text"
                      placeholder="Enter subject"
                      ref={Enteredsubject}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="message" style={{marginTop:"2rem"}}>
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={10} ref={Enteredtext}  />
                  </Form.Group>
                </Card.Body>

                <Card.Footer style={{display:"table"}}>
                <Button variant="primary" type="submit" style={{float:"left",width:"auto"}}>
                    Send
                  </Button>
                  <Editor style={{marginLeft:"1rem"}}
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={updateTextDescription}
                  />
                  
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TextEditor;

