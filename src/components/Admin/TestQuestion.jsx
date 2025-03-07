import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestion = ({ blockTestId }) => {
  const [questions, setQuestions] = useState(
    Array(20).fill({ question: "", options: ["", "", "", ""], answer: "" })
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // для индикации загрузки

  const handleOptionChange = (index, optionIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    // Ensure all questions are filled
    if (questions.some((q) => !q.question || q.options.some((opt) => !opt) || !q.answer)) {
      setError("Please fill all fields!");
      return;
    }

    setLoading(true); // начинаем загрузку
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_BASE_URL}/block-test/${blockTestId}/questions`, questions);
      setSuccess("Questions added successfully!");
    } catch (err) {
      console.error("Error adding questions:", err);
      setError("Error adding questions. Please try again.");
    } finally {
      setLoading(false); // завершили загрузку
    }
  };

  return (
    <div className="test-question">
      <h3>❓ Dodaj pytania do testu</h3>
      {questions.map((question, index) => (
        <div key={index} className="question-form">
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e)}
            placeholder={`Pytanie ${index + 1}`}
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e)}
              placeholder={`Odpowiedź ${optionIndex + 1}`}
            />
          ))}
          <select
            value={question.answer}
            onChange={(e) => handleAnswerChange(index, e)}
            placeholder="Poprawna odpowiedź"
          >
            {question.options.map((option, optionIndex) => (
              <option key={optionIndex} value={optionIndex}>
                {`Odpowiedź ${optionIndex + 1}: ${option}`}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Wysyłanie..." : "Dodaj pytania"}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default TestQuestion;
