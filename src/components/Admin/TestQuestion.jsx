import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestion = ({ blockTestId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Обработчик изменения текста вопроса
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // Обработчик изменения вариантов ответа
  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);
  };

  // Обработчик изменения правильного ответа
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Обработчик отправки данных на сервер
  const handleSubmit = async () => {
    // Проверка, все ли поля заполнены
    if (!question.trim() || options.some((opt) => !opt.trim()) || !answer.trim()) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    setLoading(true);
    setError(""); // Очищаем ошибки
    setSuccess(""); // Очищаем успешные сообщения

    try {
      const newQuestion = {
        question,
        options,
        answer,
      };

      const response = await axios.post(
        `${API_BASE_URL}/block-test/${blockTestId}/questions`,
        [newQuestion], // Отправляем вопрос как массив
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Вопрос успешно добавлен!");
      // Очистка формы после добавления вопроса
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
    } catch (err) {
      console.error("Ошибка при добавлении вопроса:", err);
      setError("Ошибка при добавлении вопроса. Пожалуйста, попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-question">
      <h3>❓ Добавить новый вопрос</h3>
      <div className="question-form">
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Введите текст вопроса"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
            placeholder={`Ответ ${index + 1}`}
          />
        ))}
        <select value={answer} onChange={handleAnswerChange}>
          <option value="">Выберите правильный ответ</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {`Ответ ${index + 1}: ${option}`}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Отправка..." : "Добавить вопрос"}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default TestQuestion;
