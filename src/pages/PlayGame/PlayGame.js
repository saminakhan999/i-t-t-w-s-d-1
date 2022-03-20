import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TheQuestions from "../../components/TheQuestions";
import { useSocket } from "../../contexts/SocketContext/SocketContext";
import QuizChat from "../../components/QuizChat";
import { recordPlayerResult } from "../../actions";

const PlayGame = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [showResults, setShowResults] = useState(false);
  const onClick = () => {
    if (showResults===false) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };




  useEffect(() => {
    socket.on("end-game", (username, score) => {
      dispatch(recordPlayerResult(username, score));
    });
  }, [socket]);

  return (
    <div>
      <TheQuestions />
      <div onClick={onClick} className="bg-slate-50 text-tblack py-3 text-center rounded-full font-bold px-6 mx-auto fixed bottom-16 left-0 right-0 w-fit">
        {showResults ? <QuizChat/> : null}Chat
      </div>
    </div>
  );
};

export default PlayGame;
