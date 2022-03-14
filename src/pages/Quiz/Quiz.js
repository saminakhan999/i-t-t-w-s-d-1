import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getQuestions from "../../actions";
import CreateGame from "../../components/CreateGame";
import Question from "../../components/Question";
import { decode } from "html-entities";

const Quiz = () => {
  const questions = useSelector((state) => state.questions);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const renderResult = () =>
    loading ? (
      <p>Loading . . .</p>
    ) : questions.length ? (
      questions.map((q, index) => {
        const matches = q.question.match(/&.+;/g);
        let newQuestion;
        if (matches) {
          matches.forEach((entity) => {
            newQuestion = q.question.replaceAll(entity, decode(entity));
          });
        } else {
          newQuestion = q.question;
        }
        return <Question key={`q_${index}`} question={newQuestion} />;
      })
    ) : (
      <p>Sorry, we don&apos;t have enough questions on that topic!</p>
    );

  const dispatch = useDispatch();
  const searchQs = ({ category, difficulty }) =>
    dispatch(getQuestions({ category, difficulty }));
  return (
    <>
      <CreateGame getQuestions={searchQs} />
      {error ? (
        <p role="alert">Oops there has been an error! {error}</p>
      ) : (
        renderResult()
      )}
    </>
  );
};
export default Quiz;
