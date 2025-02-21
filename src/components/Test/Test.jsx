import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.scss"; // Подключение стилей

const tests = {
  51: {
    title: "Test 1",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
      { question: "What is 10 - 5?", options: ["3", "5", "6"], answer: "5" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 8 / 2?", options: ["2", "4", "8"], answer: "4" },
      { question: "What is 12 / 3?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 9 + 3?", options: ["11", "12", "13"], answer: "12" },
      { question: "What is 7 - 2?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 15 / 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 4 x 3?", options: ["10", "12", "15"], answer: "12" },
    ],
  },
  52: {
    title: "Test 2",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
      { question: "What is 10 - 5?", options: ["3", "5", "6"], answer: "5" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 8 / 2?", options: ["2", "4", "8"], answer: "4" },
      { question: "What is 12 / 3?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 9 + 3?", options: ["11", "12", "13"], answer: "12" },
      { question: "What is 7 - 2?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 15 / 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 4 x 3?", options: ["10", "12", "15"], answer: "12" },
    ],
  },
  53: {
    title: "Test 3",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
      { question: "What is 10 - 5?", options: ["3", "5", "6"], answer: "5" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 8 / 2?", options: ["2", "4", "8"], answer: "4" },
      { question: "What is 12 / 3?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 9 + 3?", options: ["11", "12", "13"], answer: "12" },
      { question: "What is 7 - 2?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 15 / 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 4 x 3?", options: ["10", "12", "15"], answer: "12" },
    ],
  },
  54: {
    title: "Test 4",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
      { question: "What is 10 - 5?", options: ["3", "5", "6"], answer: "5" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 8 / 2?", options: ["2", "4", "8"], answer: "4" },
      { question: "What is 12 / 3?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 9 + 3?", options: ["11", "12", "13"], answer: "12" },
      { question: "What is 7 - 2?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 15 / 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 4 x 3?", options: ["10", "12", "15"], answer: "12" },
    ],
  },
  55: {
    title: "Test 5",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
      { question: "What is 10 - 5?", options: ["3", "5", "6"], answer: "5" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 8 / 2?", options: ["2", "4", "8"], answer: "4" },
      { question: "What is 12 / 3?", options: ["3", "4", "5"], answer: "4" },
      { question: "What is 9 + 3?", options: ["11", "12", "13"], answer: "12" },
      { question: "What is 7 - 2?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 15 / 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 4 x 3?", options: ["10", "12", "15"], answer: "12" },
    ],
  },
};

function Test({ testId }) {
  const test = tests[testId];
  const navigate = useNavigate();
  const questionsPerPage = 5;

  // Состояние для хранения всех ответов
  const [userAnswers, setUserAnswers] = useState(new Array(test.questions.length).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = test.questions.slice(startIndex, startIndex + questionsPerPage);

  // Обработчик выбора ответа
  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  // Переход на следующую страницу
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Завершение теста
  const handleFinishTest = () => {
    setTestFinished(true);
  };

  // Подсчет правильных ответов
  const correctAnswersCount = userAnswers.filter((answer, index) => answer === test.questions[index].answer).length;
  const totalQuestions = test.questions.length;
  const successPercentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  return (
    <div className="test">
      <h3>{test.title}</h3>
      <form>
        {currentQuestions.map((q, index) => {
          const questionIndex = startIndex + index;
          return (
            <div key={questionIndex} className="question">
              <p>{q.question}</p>
              {q.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={userAnswers[questionIndex] === option}
                    onChange={() => handleAnswerChange(questionIndex, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          );
        })}
      </form>

      <div className="buttons">
        {startIndex + questionsPerPage < totalQuestions ? (
          <button onClick={handleNextPage} className="next-button">
            Dalej
          </button>
        ) : (
          <button onClick={handleFinishTest} className="finish-button">
            Zakończ
          </button>
        )}
      </div>

      {testFinished && (
        <div className="result">
          <p>Twój wynik: {successPercentage}%</p>
          {successPercentage >= 80 ? (
            <p>Test jest zdany!</p>
          ) : (
            <p>Przejdź kurs ponownie</p>
          )}

          <button onClick={() => navigate("/block/1")} className="go-to-video">
            Wróć do wyboru video
          </button>
        </div>
      )}
    </div>
  );
}

export default Test;
