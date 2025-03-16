import React from "react";

function Question({ question, options, selectedAnswer, onAnswerChange }) {
  // Проверка, что options является массивом
  if (!Array.isArray(options)) {
    console.error("Ошибка в данных опций:", options);
    return <p>Ошибка в данных вопроса.</p>;
  }

  return (
    <div className="question">
      <p>{question}</p>
      {options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name={question} // Каждый вопрос должен иметь уникальное имя
            value={opt} // Используем строку как значение
            checked={selectedAnswer === opt} // Проверка, выбран ли ответ
            onChange={() => onAnswerChange(opt)} // Изменение ответа
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default Question;
