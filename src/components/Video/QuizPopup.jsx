import React from "react";

function QuizPopup({ question, onAnswer }) {
  return (
    <div className="quiz-popup">
      <h4>{question.question}</h4>
      <div className="answers">
        {question.options.map((option, idx) => (
          <button key={idx} onClick={() => onAnswer(option)}>{option}</button>
        ))}
      </div>
    </div>
  );
}

export default QuizPopup;
