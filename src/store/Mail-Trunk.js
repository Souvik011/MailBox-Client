import { MailSliceAction } from "./MailSlice";
import { SendSliceAction } from "./SendMailSlice";

export const sendMailHandler = (mailobj) => {
  return async (Disptach) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");
    let receiverEmail = mailobj.email.replace(/[&@.]/g, "");
    console.log(receiverEmail,"  ",emailId);

    const sendingmail = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${receiverEmail}/sendbox.json`,
        {
          method: "POST",
          body: JSON.stringify(mailobj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };
    const sendBoxmail = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(mailobj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };


    try {
      await sendingmail();
      await sendBoxmail();
      Disptach(MailSliceAction.setSentData(mailobj.email));
      Disptach(SendSliceAction.sendItemUpdateTrigger());
    } catch (error) {
      console.log(error.message);
    }
  };
};


export const getmailHandler = () => {
  let emailId;
  if(localStorage.getItem("mailid")){
   emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");
  };
  return async (Disptach) => {
    
    const gettingSendMailList = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/inbox.json`,
        {
          method: "Get",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };


    try {
      const receivedData = await gettingSendMailList();
      const transformeddata = [];
      for (const key in receivedData) {
        const Obj = {
          id: key,
          ...receivedData[key],
        };
        transformeddata.push(Obj);
      }
      console.log(transformeddata);
      Disptach(MailSliceAction.updateItem(transformeddata));

    } catch (error) {
      console.log(error.message);
  };
};
};

export const getSendMailList = () => {
  let emailId;
  if(localStorage.getItem("mailid")){
   emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");
  };

  return async (Dispatch) => {
    const gettingMailList = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/sendbox.json`,
        {
          method: "Get",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {

      const sendData = await gettingMailList();
      
      const sendDataArray= [];
      for (const key in sendData) {
        const SendObj = {
          id: key,
          ...sendData[key],
        };
        sendDataArray.push(SendObj);
        
    } 
    Dispatch(SendSliceAction.AddSenditemList(sendDataArray));
    } catch (error) {
      console.log(error.message);
  };

  };
};

export const UpdateList = (obj) => {

  return async (Dispatch) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const UpdateEmailList = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/inbox/${obj.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: obj.email,
            subject: obj.subject,
            text: obj.text,
            sendermail:obj.sendermail,
            readreceipt: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await UpdateEmailList();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};


export const UpdateSendList = (obj) => {

  return async (Dispatch) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const UpdateEmailList = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/sendbox/${obj.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: obj.email,
            subject: obj.subject,
            text: obj.text,
            sendermail:obj.sendermail,
            readreceipt: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await UpdateEmailList();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};


export const MsgViewInfo  = (messageId) => {
  let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");
  return async (Disptach) => {
    const gettingMsg = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/inbox/${messageId}.json`,
        {
          method: "Get",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };
    try {
      const data = await gettingMsg();
      Disptach(MailSliceAction.addMessageViewinfo(data));
    } catch (error) {
      console.log(error.message);
    }
  };

};

export const SendMsgViewInfo  = (messageId) => {
  let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");
  return async (Disptach) => {
    const gettingMsg = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/sendbox/${messageId}.json`,
        {
          method: "Get",
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };
    try {
      const data = await gettingMsg();
      console.log(data);
      Disptach(SendSliceAction.addMessageViewinfo(data));
    } catch (error) {
      console.log(error.message);
    }
  };

};


export const DeleteMail = (id) => {
  return async (Dispatch) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const DeletingMail = async () => {
      
    
    try {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/inbox/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("Deleting This working Mail");
      Dispatch(getmailHandler());
    } catch (error) {
      console.log(error.message);
    }
  };
  DeletingMail();
};
};

export const DeleteSendMail = (id) => {
  return async (Dispatch) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const DeletingMail = async () => {
      
    
    try {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/sendbox/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("Deleting This working Mail");
      Dispatch(getSendMailList());
    } catch (error) {
      console.log(error.message);
    }
  };
  DeletingMail();
};
};

export const reply = (mail) => {
  return (dispatch) => {
    console.log(mail);
    dispatch(SendSliceAction.reply(mail));
  };
}

export const ToggleReply = () => {
  return (dispatch) => {
    dispatch(SendSliceAction.toggleReply());
  };
}