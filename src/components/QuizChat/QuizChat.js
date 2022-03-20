import React, {useState} from "react";
import { useSocket } from "../../contexts/SocketContext/SocketContext";

const QuizChat = () => {
  const socket = useSocket();
  const [input, setInput] = useState("");

  const handleChatSubmit = (e) => {
    e.preventDefault();
    socket.emit("the-message", input.value);
    console.log("it worked");
  };
  const updateInput = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const onClick = () => {
    socket.on("chat-message", (username, msg) => {
      return (
        <li>
          {username}: {msg}
        </li>
      );
    });
    console.log("print message");
  };
  

  return (
    <div className=" mb-0 mt-16 rounded-lg overflow-hidden bg-slate-50 border-2 border-tblack p-4 flex flex-col items-center fixed w-96 h-2/3 z-10">
      <form onSubmit={handleChatSubmit} id="form">
        <input
          id="input"
          value={input}
          autoComplete="off"
          onChange={updateInput}
        />
        <button onClick={onClick}>Send</button>
      </form>
    </div>
  );
};

export default QuizChat;
