import React,{ useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import SendBoxListItem from './SendBoxListItem';

import { useSelector} from "react-redux";
const SendBoxList = () => {
  const sentItem = useSelector((state) => state.mail.sentItem);
  useEffect(() => {
    console.log(sentItem);
  }, [sentItem]);
  return (
    <>
      <ListGroup as="ul" variant="primary">
        {sentItem.map((item) => (
          <SendBoxListItem
            key={item.id}
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