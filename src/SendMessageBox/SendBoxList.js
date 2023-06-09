import React,{ useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import SendBoxListItem from './SendBoxListItem';

import { useSelector} from "react-redux";
const SendBoxList = () => {
  const sentItem = useSelector((state) => state.send.sentItem);
  useEffect(() => {
    console.log(sentItem);
  }, [sentItem]);
  return (
    <>
      <ListGroup as="ul" variant="primary">
        {sentItem.map((item) => (
          <SendBoxListItem
            key={item.id}
            sendermail = {item.sendermail}
            email={item.email}
            subject={item.subject}
            text={item.text}
            id={item.id}
            readreceipt={item.readreceipt}
          ></SendBoxListItem>
        ))}
      </ListGroup>
    </>
  );
};
export default SendBoxList;