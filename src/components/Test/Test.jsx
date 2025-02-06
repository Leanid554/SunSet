// src/components/Test/Test.jsx
import React from "react";

const tests = {
  51: {
    title: "Test 1",
    questions: [
      { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" }, //test block 1
      { question: "What is 3 + 5?", options: ["7", "8", "9"], answer: "8" },
    ],
  },
  52: {
    title: "Test 2",
    questions: [
      { question: "What is 1 + 1?", options: ["1", "2", "3"], answer: "2" },  //test block 2
      { question: "What is 2 + 3?", options: ["4", "5", "6"], answer: "5" },
    ],
  },
};

function Test({ testId }) {
  const test = tests[testId];

  return (
    <div className="test">
      <h3>{test?.title}</h3>
      <form>
        {test?.questions.map((q, index) => (
          <div key={index} className="question">
            <p>{q.question}</p>
            {q.options.map((option, i) => (
              <label key={i}>
                <input type="radio" name={`question-${index}`} value={option} />
                {option}
              </label>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
}

export default Test;
