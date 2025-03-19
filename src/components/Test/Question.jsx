import React from "react";

function Question({ question, options, selectedAnswer, onAnswerChange }) {
  if (!Array.isArray(options)) {
    return <p>Blad w pytaniu</p>;
  }

  return (
    <div className="question">
      <p>{question}</p>
      {options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name={question}
            value={opt}
            checked={selectedAnswer === opt}
            onChange={() => onAnswerChange(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default Question;
