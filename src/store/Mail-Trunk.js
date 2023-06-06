import { MailSliceAction } from "./MailSlice";

export const sendMailHandler = (mailobj) => {
  return async (Disptach) => {
    let emailId = await mailobj.email.replace(/[&@.]/g, "");

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
      Disptach(MailSliceAction.updateItem(transformeddata));
    } catch (error) {
      console.log(error.message);
    }
  };
};