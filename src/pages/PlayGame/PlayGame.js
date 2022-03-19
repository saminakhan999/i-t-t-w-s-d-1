import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TheQuestions from "../../components/TheQuestions";
import { useSocket } from "../../contexts/SocketContext/SocketContext";
import { recordPlayerResult } from "../../actions";

const PlayGame = () => {
  const dispatch = useDispatch();
  const socket = useSocket();




  useEffect(() => {
    socket.on("end-game", (username, score) => {
      dispatch(recordPlayerResult(username, score));
    });
  }, [socket]);

  return (
    <div>
      <TheQuestions />
      <div className="bg-slate-50 text-tblack py-3 text-center rounded-full font-bold px-6 mx-auto fixed bottom-16 left-0 right-0 w-fit">Chat</div>
    </div>
  );
};

export default PlayGame;
