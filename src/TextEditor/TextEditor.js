import React , {useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./TextEditor.css";
import { useDispatch } from "react-redux";
import { sendMailHandler } from "../store/Mail-Trunk";

const TextEditor = () => {
    const Disptach = useDispatch();
    const [editorState,setEditorState] = useState(undefined);
  const Enteredemail = React.createRef(null);
  const Enteredsubject = React.createRef(null);
  const Enteredtext = React.createRef(null);
  const FormsubmitHandler = (event) => {
    event.preventDefault();
    const mailData = {
      email: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredsubject.current.value,
    };
    Disptach(sendMailHandler(mailData));
    console.log(mailData, "TextEditing-FormsubmitHandler");
  };

  const updateTextDescription = (editorState) => {
    setEditorState(editorState);
  };
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col>
            <Form className="pt-4" onSubmit={FormsubmitHandler}>
              <Card style={{ width: "auto" }} border="success">
                <Card.Header>
                  <h3 style={{textAlign:"center"}}>Mail Box </h3>
                </Card.Header>
                <Card.Body className="colours">
                  <Form.Group controlId="email" style={{display:"table" , width:"auto"}}>
                    <Form.Label style={{float:"left",width:"auto"}}>To :</Form.Label>
                    <Form.Control style={{float:"left",width:"64rem",height:"2rem" , marginLeft:"1rem"}}
                      size="sm"
                      type="email"
                      placeholder="Enter Email"
                      ref={Enteredemail}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="subject" style={{display:"table" , width:"auto" , marginTop:"2rem"}}>
                    <Form.Label style={{float:"left",width:"auto"}}>Subject : </Form.Label>
                    <Form.Control style={{float:"left",width:"62rem",marginLeft:"1rem"}}
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

