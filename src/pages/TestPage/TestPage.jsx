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
  const [blockTestId, setBlockTestId] = useState(0);

  useEffect(() => {
    if (!blockId) {
      setError("❌ Nieprawidłowy identyfikator bloku");
      setLoading(false);
      return;
    }

    const fetchTestQuestions = async () => {
      try {
        console.log(`Запрос к API: ${API_BASE_URL}/block-test/${blockId}`);
        const response = await axios.get(`${API_BASE_URL}/block-test/${blockId}`);
        console.log("Ответ API:", response.data);

        if (!response.data || !Array.isArray(response.data.questions)) {
          throw new Error("❌ Неправильный формат ответа API: нет вопросов");
        }

        setBlockTestId(response.data.id);

        let shuffledQuestions = shuffleArray(response.data.questions)
          .slice(0, 20)
          .map((q) => ({
            ...q,
            options: shuffleArray(JSON.parse(q.options)), // 🔥 Фиксируем строковый массив
          }));

        setQuestions(shuffledQuestions);
      } catch (err) {
        console.error("Ошибка при загрузке теста:", err.message);
        setError(err.message || "❌ Ошибка загрузки теста");
      } finally {
        setLoading(false);
      }
    };

    fetchTestQuestions();
  }, [blockId]);

  const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
      console.error("❌ shuffleArray: ожидался массив, получено:", array);
      return [];
    }
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    let updatedCorrectAnswers = correctAnswersCount;

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
        ? "Gratulacje! Pomyślnie ukończyłeś test."
        : "❌ Za mało poprawnych odpowiedzi. Spróbuj ponownie."
    );

    setIsFinished(true);
    saveTestProgress(passed);
  };

  const saveTestProgress = async (passed) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/block-test/progress`, {
        userId,
        blockTestId,
        passed,
      });
    } catch (err) {}
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswersCount(0);
    setSelectedOption(null);
    setIsFinished(false);
    setResultMessage("");
    setQuestions(
      shuffleArray(
        questions.map((q) => ({ ...q, options: shuffleArray(q.options) }))
      )
    );
  };

  if (loading) return <div className="loader">⏳ Ładowanie testu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="test-container">
      <h2>Test po bloku ({blockId})</h2>

      {isFinished ? (
        <div className="finish-message">
          <h3>{resultMessage}</h3>
          <p>
            Prawidłowe odpowiedzi: {correctAnswersCount} z {questions.length} (
            {((correctAnswersCount / questions.length) * 100).toFixed(2)}%)
          </p>

          {isPassed ? (
            <button className="finish-button" onClick={() => navigate("/main")}>
              Główna strona
            </button>
          ) : (
            <button className="retry-button" onClick={restartTest}>
              🔄 Spróbuj ponownie
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
                  className={`option ${selectedOption === index ? "selected" : ""}`}
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
              {currentQuestionIndex === questions.length - 1 ? "Skończyć" : "Dalej"}
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default TestPage;
