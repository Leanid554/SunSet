import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.scss";
import Question from "../../components/Test/Question";

function Test({ questions, blockId }) {
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState([]);
  const [testFinished, setTestFinished] = useState(false);
  const [successPercentage, setSuccessPercentage] = useState(null);

  useEffect(() => {
    setUserAnswers(Array(questions.length).fill(null));
  }, [questions]);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[index] = answer;
      return updated;
    });
  };

  const handleFinishTest = () => {
    const correctCount = userAnswers.filter(
      (ans, idx) => ans === questions[idx].answer
    ).length;
    const score = Math.round((correctCount / questions.length) * 100);
    setSuccessPercentage(score);
    setTestFinished(true);
  };

  if (testFinished) {
    return (
      <div className="result">
        <p>Twój wynik: {successPercentage}%</p>
        {successPercentage >= 80 ? (
          <>
            <p>Test zaliczony! 🎉</p>
            <button onClick={() => navigate("/main")} className="go-to-main">
            Ukończ blok
            </button>
          </>
        ) : (
          <>
            <p>Spróbuj ponownie!</p>
            <button
              onClick={() => navigate(`/block/${blockId}`)}
              className="go-to-video"
            >
              Powrót do wideo
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="test">
      <h3>Тест для блока {blockId}</h3>
      <form>
        {questions.map((q, idx) => (
          <Question
            key={idx}
            question={q.question}
            options={q.options} // Передаем опции как массив
            selectedAnswer={userAnswers[idx]}
            onAnswerChange={(answer) => handleAnswerChange(idx, answer)}
          />
        ))}
      </form>
      <button onClick={handleFinishTest} className="finish-button">
        Завершить тест
      </button>
    </div>
  );
}

export default Test;
