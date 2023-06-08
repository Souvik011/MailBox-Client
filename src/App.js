import SignUp from './authenticationPages/SignUp';
import TextEditor from './TextEditor/TextEditor';
import InboxPage from './Inbox/InboxPage';
import ViewMessage from './Inbox/ViewMessage';
import SendBoxPage from './SendMessageBox/SendBoxPage';
import SentMessageView from './SendMessageBox/SendMessageView';
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  
const islogin = useSelector(state=> state.auth.islogin);
console.log(islogin);
  return (<div>
    <Routes>
    
         {islogin ? (<Route path="/" element={<InboxPage/>} />) : (<Route path="/" element={<SignUp />} />)}
       
         {islogin ? (<Route path="/compose" element={<TextEditor/>} />) : (<Route path="/compose" element={<SignUp />} />)}

         {islogin ? (<Route path="/signup" element={<InboxPage/>} />) : (<Route path="/signup" element={<SignUp />} />)}

       
         {islogin ? (<Route path="/inboxpage" element={<InboxPage/>} />) : (<Route path="/inboxpage" element={<SignUp />} />)}

         {islogin ? (<Route path="/inboxpage/:messageId" element={<ViewMessage/>} />) : (<Route path="/inboxpage/:messageId" element={<SignUp />} />)}

         {islogin ? (<Route path="/sendbox" element={<SendBoxPage/>} />) : (<Route path="/inboxpage/:messageId" element={<SignUp />} />)}
        
         {islogin ? (<Route path="/sendbox/:messageId" element={<SentMessageView/>} />) : (<Route path="/sendpage/:messageId" element={<SignUp />} />)}

         
    </Routes>
  </div>);
}

export default App;
