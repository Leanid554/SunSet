import React, { useState } from "react";
import axios from "axios";

// Добавим API_BASE_URL в этот компонент
const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const QuestionVideo = ({ lectureId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [timeInSeconds, setTimeInSeconds] = useState(0); // Добавим состояние для времени в секундах

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const questionData = {
      question,
      options,
      answer,
      lectureId,
      timeInSeconds, // Добавляем время в секунды
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/questions`, questionData);
      alert("Вопрос успешно добавлен!");
    } catch (error) {
      console.error("Ошибка при добавлении вопроса:", error);
      alert("Ошибка при добавлении вопроса");
    }
  };

  return (
    <div>
      <h3>Добавить вопрос к лекции</h3>
      <input
        type="text"
        placeholder="Введите вопрос"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Опция ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <input
        type="text"
        placeholder="Правильный ответ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      {/* Добавляем поле для времени в секундах */}
      <input
        type="number"
        placeholder="Время в секундах"
        value={timeInSeconds}
        onChange={(e) => setTimeInSeconds(parseInt(e.target.value) || 0)} // Преобразуем в целое число
      />
      <button onClick={handleSubmit}>Добавить вопрос</button>
    </div>
  );
};

export default QuestionVideo;
