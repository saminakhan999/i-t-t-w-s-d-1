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
      <form id="form" action="">
        <input id="input" autocomplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default PlayGame;
