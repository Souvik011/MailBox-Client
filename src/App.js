
import TextEditor from './TextEditor/TextEditor';
import InboxPage from './Inbox/InboxPage';
import { Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  

  return (<div>
    <Routes>
    
    
          <Route path="/inboxpage" element={<InboxPage />} />
       
   
          <Route path="/compose" element={<TextEditor />} />
        
    </Routes>
  </div>);
}

export default App;
