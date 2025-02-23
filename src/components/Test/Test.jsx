import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.scss";
import videosData, { updateProgress, saveTestResult } from "../../data/videosData";
import testsData from "../../data/testsData"; 
import Question from "../../components/Test/Question";

function Test({ testId }) {
  const test = testsData[testId];
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState(Array(test.questions.length).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [successPercentage, setSuccessPercentage] = useState(null);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[index] = answer;
      return updated;
    });
  };

  const handleFinishTest = () => {
    const correctCount = userAnswers.filter((ans, idx) => ans === test.questions[idx].answer).length;
    const score = Math.round((correctCount / test.questions.length) * 100);
    setSuccessPercentage(score);
    saveTestResult("user1", testId, score);

    if (score >= 80) {
      if (videosData[test.blockId]) {
        videosData[test.blockId].forEach((video) => updateProgress(test.blockId, video.id, 100));
      }
      if (videosData[test.nextBlockId]) {
        videosData[test.nextBlockId].forEach((video) => updateProgress(test.nextBlockId, video.id, 0));
      }
    }

    setTestFinished(true);
  };

  return (
    <div className="test">
      <h3>{test.title}</h3>
      {!testFinished ? (
        <>
          <form>
            {test.questions.map((q, idx) => (
              <Question
                key={idx}
                question={q.question}
                options={q.options}
                selectedAnswer={userAnswers[idx]}
                onAnswerChange={(answer) => handleAnswerChange(idx, answer)}
              />
            ))}
          </form>
          <button onClick={handleFinishTest} className="finish-button">Zakończ</button>
        </>
      ) : (
        <div className="result">
          <p>Twój wynik: {successPercentage}%</p>
          {successPercentage >= 80 ? (
            <>
              <p>Test zdany! 🎉</p>
              <button onClick={() => navigate("/main")} className="go-to-main">Zakończ blok</button>
            </>
          ) : (
            <>
              <p>Przejdź kurs ponownie</p>
              <button onClick={() => navigate("/block/1")} className="go-to-video">Wróć do wyboru видео</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;
