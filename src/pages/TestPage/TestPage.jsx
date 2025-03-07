import React, { useState } from "react";
import "./TestPage.scss";

function TestPage() {
  const questions = [
    { id: 1, text: "Какой цвет у неба?", options: ["Синий", "Зелёный", "Красный", "Жёлтый"], correctAnswer: "Синий" },
    { id: 2, text: "Сколько ног у паука?", options: ["4", "6", "8", "10"], correctAnswer: "8" },
    { id: 3, text: "Как называется столица Франции?", options: ["Берлин", "Лондон", "Париж", "Мадрид"], correctAnswer: "Париж" },
    { id: 4, text: "Какая планета ближе всего к Солнцу?", options: ["Земля", "Венера", "Марс", "Меркурий"], correctAnswer: "Меркурий" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: selectedAnswer,
    }));

    setSelectedAnswer(null);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const correctAnswersCount = Object.values(answers).filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  return (
    <div className="test-container">
      {!showResult ? (
        <div className="question-box">
          <h2>{questions[currentQuestionIndex].text}</h2>
          <ul className="answer-list">
            {questions[currentQuestionIndex].options.map((option) => (
              <li
                key={option}
                className={selectedAnswer === option ? "selected" : ""}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button className="next-button" onClick={handleNextQuestion} disabled={selectedAnswer === null}>
            Следующий вопрос
          </button>
        </div>
      ) : (
        <div className="result-box">
          <h2>Тест завершён!</h2>
          <p>Вы ответили правильно на {correctAnswersCount} из {questions.length} вопросов.</p>
        </div>
      )}
    </div>
  );
}

export default TestPage;
