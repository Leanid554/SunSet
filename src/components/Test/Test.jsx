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
      { question: "What is 1 + 1?", options: ["1", "2", "3"], answer: "2" },
      { question: "What is 2 + 3?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 4 x 2?", options: ["6", "8", "9"], answer: "8" },
      { question: "What is 5 - 2?", options: ["1", "2", "3"], answer: "3" },
      { question: "What is 3 x 3?", options: ["6", "9", "12"], answer: "9" },
      { question: "What is 7 x 2?", options: ["13", "14", "15"], answer: "14" },
      { question: "What is 8 - 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 6 x 3?", options: ["16", "17", "18"], answer: "18" },
      { question: "What is 9 + 4?", options: ["12", "13", "14"], answer: "13" },
      { question: "What is 12 / 3?", options: ["3", "4", "5"], answer: "4" },
    ],
  },
  53: {
    title: "Test 3",
    questions: [
      { question: "What is 7 + 2?", options: ["8", "9", "10"], answer: "9" },
      { question: "What is 9 - 4?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 2 x 4?", options: ["6", "8", "10"], answer: "8" },
      { question: "What is 12 / 4?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 10 - 7?", options: ["1", "2", "3"], answer: "3" },
      { question: "What is 5 + 3?", options: ["7", "8", "9"], answer: "8" },
      { question: "What is 15 / 5?", options: ["2", "3", "4"], answer: "3" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 20 - 5?", options: ["15", "16", "17"], answer: "15" },
      { question: "What is 3 x 3?", options: ["6", "9", "12"], answer: "9" },
    ],
  },
  54: {
    title: "Test 4",
    questions: [
      { question: "What is 5 + 5?", options: ["10", "11", "12"], answer: "10" },
      { question: "What is 6 x 2?", options: ["10", "12", "14"], answer: "12" },
      { question: "What is 15 / 3?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 9 + 1?", options: ["10", "11", "12"], answer: "10" },
      { question: "What is 8 - 3?", options: ["4", "5", "6"], answer: "5" },
      { question: "What is 6 x 6?", options: ["34", "35", "36"], answer: "36" },
      { question: "What is 2 + 8?", options: ["9", "10", "11"], answer: "10" },
      { question: "What is 10 - 4?", options: ["5", "6", "7"], answer: "6" },
      { question: "What is 3 x 5?", options: ["12", "13", "15"], answer: "15" },
      { question: "What is 7 + 2?", options: ["8", "9", "10"], answer: "9" },
    ],
  },
};

function Test({ testId }) {
  const test = tests[testId];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // Страница с вопросами
  const [userAnswers, setUserAnswers] = useState([]); // Ответы пользователя
  const [testFinished, setTestFinished] = useState(false); // Завершение теста
  const questionsPerPage = 5;

  // Вычисляем вопросы для текущей страницы
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = test?.questions.slice(startIndex, startIndex + questionsPerPage);

  // Обработчик для ответа на вопрос
  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  // Функция для перехода на следующую страницу с вопросами
  const handleNextPage = () => {
    if (startIndex + questionsPerPage < test?.questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Функция для завершения теста
  const handleFinishTest = () => {
    setTestFinished(true);
  };

  // Вычисляем процент правильных ответов
  const correctAnswersCount = userAnswers.filter((answer, index) => answer === test?.questions[index].answer).length;
  const totalQuestions = test?.questions.length;
  const successPercentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  // Функция для перенаправления на страницу выбора видео
  const redirectToVideoPage = () => {
    navigate("/block/1"); // Переход на страницу выбора видео, можно изменить на нужную
  };

  return (
    <div className="test">
      <h3>{test?.title}</h3>
      <form>
        {currentQuestions?.map((q, index) => (
          <div key={index} className="question">
            <p>{q.question}</p>
            {q.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${startIndex + index}`}
                  value={option}
                  onChange={() => handleAnswerChange(startIndex + index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
      </form>

      {/* Кнопка "Dalej" для загрузки следующих 5 вопросов */}
      <div className="buttons">
        {startIndex + questionsPerPage < test?.questions.length && (
          <button onClick={handleNextPage} className="next-button">
            Dalej
          </button>
        )}
      </div>

      {/* Кнопка "Zakończ" появляется, когда все вопросы пройдены */}
      {startIndex + questionsPerPage >= totalQuestions && !testFinished && (
        <button onClick={handleFinishTest} className="finish-button">
          Zakończ
        </button>
      )}

      {/* Показ результатов после завершения теста */}
      {testFinished && (
        <div className="result">
          <p>
            Twój wynik: {successPercentage}% 
          </p>
          {successPercentage >= 80 ? (
            <p>Test jest zdany - twój wynik: {successPercentage}%</p>
          ) : (
            <p>Przejdź kurs ponownie</p>
          )}

          <div className="buttons">
            <button onClick={redirectToVideoPage} className="go-to-video">
              Wróć do wyboru video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
