import React, { useState } from "react";

function Test({ questions }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const submitTest = () => {
    let correctAnswers = questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    setResult(`Вы ответили правильно на ${correctAnswers} из ${questions.length}`);
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={question.id}
                value={option}
                onChange={() => handleAnswer(question.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitTest}>Отправить</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default Test;
