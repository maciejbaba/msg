import React, { useState } from "react";
import useChatState from "./store/store";
import "./index.css";

const App: React.FC = () => {
  const messages = useChatState((state) => state.messages);
  const [msg, setMsg] = useState("");

  const handleMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };
  const handleAddMsg = () => {
    if (msg !== "") {
      useChatState.getState().add(msg);
      setMsg("");
    }
  };
  return (
    <>
      <div className="App">
        <h1>React TypeScript App</h1>
        <h2>Messages: {messages.length}</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Add message</h1>
        <input type="text" value={msg} onChange={handleMsgChange} />
        <button onClick={handleAddMsg}>Send</button>
      </div>
    </>
  );
};

export default App;
