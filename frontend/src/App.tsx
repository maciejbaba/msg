import React, { useEffect, useState } from "react";
import useChatState from "./store/store";
import "./index.css";

const App: React.FC = () => {
  const messages = useChatState((state) => state.messages);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState("");
  const [dbMessages, setDbMessages] = useState([""]);

  fetch("http://localhost:3000/api")
    .then((res) => res.json())
    .then((data) => {
      setData(data.message);
    });
  
  fetch("http://localhost:3000/api/messages")
    .then((res) => res.json())
    .then((data) => {
      setDbMessages(data);
    });
  const handleMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };
  const handleAddMsg = () => {
    if (msg !== "") {
      useChatState.getState().addMessage(msg);
      setMsg("");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="App max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">React TypeScript App</h1>
        <h2 className="text-xl font-semibold mb-3">
          Messages: {messages.length}
        </h2>
        <ul className="mb-4 border-t">
          {messages.map((msg, index) => (
            <li key={index} className="border-b py-2">
              {msg}
            </li>
          ))}
          {data}
        </ul>
      </div>
      <div className="max-w-lg mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-3">Add message</h2>
        <div className="flex">
          <input
            type="text"
            value={msg}
            onChange={handleMsgChange}
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddMsg}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
