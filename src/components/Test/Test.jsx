import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.scss";
import videosData, { updateProgress, saveTestResult } from "../../components/videosData/videosData";

const tests = {
  51: { title: "Test 1", blockId: 1, nextBlockId: 2, questions: [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
    { question: "What is 10 - 5?", options: ["3", "5", "6"], answer: "5" },
    { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
    { question: "What is 8 / 2?", options: ["2", "4", "8"], answer: "4" },
  ]},
};

function Test({ testId }) {
  const test = tests[testId];
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
              <div key={idx} className="question">
                <p>{q.question}</p>
                {q.options.map((opt, i) => (
                  <label key={i}>
                    <input type="radio" name={`question-${idx}`} value={opt} checked={userAnswers[idx] === opt} onChange={() => handleAnswerChange(idx, opt)} />
                    {opt}
                  </label>
                ))}
              </div>
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
              <button onClick={() => navigate("/block/1")} className="go-to-video">Wróć do wyborу video</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;
