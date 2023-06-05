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
      Disptach(MailSliceAction.setSentData());
    } catch (error) {
      console.log(error.message);
    }
  };
};