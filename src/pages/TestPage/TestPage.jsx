import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TestPage.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function TestPage() {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isPassed, setIsPassed] = useState(false);
  const [blockTestId, setblockTestId] = useState(0);

  useEffect(() => {
    if (!blockId) {
      setError("❌ Неверный идентификатор блока");
      setLoading(false);
      return;
    }

    const fetchTestQuestions = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/block-test/${blockId}`
        );
        console.log("Полученные данные:", response.data);
        setblockTestId(response.data.id);
        if (
          response.data?.questions &&
          Array.isArray(response.data.questions)
        ) {
          const formattedQuestions = response.data.questions.map((q) => ({
            ...q,
            options: JSON.parse(q.options), // Преобразуем строку в массив
          }));
          setQuestions(formattedQuestions);
        } else {
          setError("❌ Ошибка: Вопросы не найдены или неверный формат данных");
        }
      } catch (err) {
        setError("❌ Ошибка загрузки теста");
        console.error("Ошибка:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestQuestions();
  }, [blockId]);

  const handleNext = () => {
    if (selectedOption === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    let updatedCorrectAnswers = correctAnswersCount;

    // Проверяем правильность ответа
    if (currentQuestion.options[selectedOption] === currentQuestion.answer) {
      updatedCorrectAnswers += 1;
      setCorrectAnswersCount(updatedCorrectAnswers);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      handleFinish(updatedCorrectAnswers);
    }
  };

  const handleFinish = (finalCorrectAnswers) => {
    const totalQuestions = questions.length;
    const percentage = (finalCorrectAnswers / totalQuestions) * 100;
    const passed = percentage >= 80;

    setIsPassed(passed);
    setResultMessage(
      passed
        ? "🎉 Поздравляем! Вы успешно прошли тест."
        : "❌ Недостаточно правильных ответов. Попробуйте еще раз."
    );

    setIsFinished(true);

    // Сохраняем прогресс, даже если тест не сдан
    saveTestProgress(passed);
  };

  const saveTestProgress = async (passed) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("❌ Не найден userId в localStorage");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/block-test/progress`, {
        userId: userId,
        blockTestId: blockTestId,
        passed: passed, // отправляем false, если не сдано
      });
    } catch (err) {
      console.error(
        "Ошибка при сохранении результата теста:",
        err.response?.data || err.message
      );
    }
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setSelectedOption(null);
    setIsFinished(false);
    setResultMessage("");
  };

  if (loading) return <div className="loader">⏳ Загрузка теста...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="test-container">
     <h2>Test po bloku ({blockId})</h2>


      {isFinished ? (
        <div className="finish-message">
          <h3>{resultMessage}</h3>
          <p>
            Правильных ответов: {correctAnswersCount} из {questions.length} (
            {((correctAnswersCount / questions.length) * 100).toFixed(2)}%)
          </p>

          {isPassed ? (
            <button className="finish-button" onClick={() => navigate("/main")}>
              Перейти на главную
            </button>
          ) : (
            <button className="retry-button" onClick={restartTest}>
              🔄 Попробовать снова
            </button>
          )}
        </div>
      ) : (
        questions.length > 0 && (
          <div className="question-card">
            <h3>{questions[currentQuestionIndex].question}</h3>
            <ul className="options-list">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li
                  key={index}
                  className={`option ${
                    selectedOption === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedOption(index)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button
              className="next-button"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Завершить"
                : "Далее"}
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default TestPage;
