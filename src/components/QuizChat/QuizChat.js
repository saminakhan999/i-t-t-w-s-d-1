import React, {useEffect} from "react";
import { useSocket } from "../../contexts/SocketContext/SocketContext";

const QuizChat = () => {
  const socket = useSocket();

  const handleChatSubmit = (e) => {
    e.preventDefault();
    socket.emit("the-message", e.target.value);
  };

  useEffect(() => {
    socket.on("chat-message", (username, msg) => {
      return (
        <li>
          {username}: {msg}
        </li>
      );
    });
  }, [socket]);
  

  return (
    <div className=" mb-0 mt-16 rounded-lg overflow-hidden bg-slate-50 border-2 border-tblack p-4 flex flex-col items-center fixed w-96 h-2/3 z-10">
      <form onSubmit={handleChatSubmit} id="form" action="">
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default QuizChat;
