// TestQuestion.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestion = ({ blockTestId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.some((opt) => !opt)) {
      setError("Please fill all fields!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/test-question`, {
        blockTestId,
        question,
        options,
        correctAnswer,
      });
      setSuccess("Question added successfully!");
      setError("");
    } catch (err) {
      console.error("Error adding question:", err);
      setError("Error adding question. Please try again.");
    }
  };

  return (
    <div className="test-question">
      <h3>❓ Dodaj pytanie do testu</h3>
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pytanie"
        />
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
            placeholder={`Odpowiedź ${index + 1}`}
          />
        </div>
      ))}
      <div>
        <label>Poprawna odpowiedź:</label>
        <select value={correctAnswer} onChange={(e) => setCorrectAnswer(Number(e.target.value))}>
          {options.map((_, index) => (
            <option key={index} value={index}>
              Odpowiedź {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Dodaj pytanie</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default TestQuestion;
