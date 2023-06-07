import { MailSliceAction } from "./MailSlice";

export const sendMailHandler = (mailobj) => {
  return async (Disptach) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const sendingmail = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}.json`,
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
      Disptach(MailSliceAction.setSentData(mailobj.email));
    } catch (error) {
      console.log(error.message);
    }
  };
};


export const getmailHandler = () => {
  let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");
  return async (Disptach) => {
    const gettingMailList = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}.json`,
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
      const data = await gettingMailList();
      const transformeddata = [];
      for (const key in data) {
        const Obj = {
          id: key,
          ...data[key],
        };
        transformeddata.push(Obj);
      }
      console.log(transformeddata);
      Disptach(MailSliceAction.updateItem(transformeddata));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const UpdateList = (obj) => {

  return async (Dispatch) => {
    let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const UpdateEmailList = async () => {
      const response = await fetch(
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/${obj.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            email: obj.email,
            subject: obj.subject,
            text: obj.text,
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
        `https://mailbox-client-a617d-default-rtdb.firebaseio.com/${emailId}/${messageId}.json`,
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