import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestion = ({ blockId, testId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    if (
      !question.trim() ||
      options.some((opt) => !opt.trim()) ||
      !answer.trim()
    ) {
      setError("Prosimy o wypełnienie wszystkich pól.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const newQuestion = {
        question,
        options,
        answer,
      };

      await axios.post(
        `${API_BASE_URL}/block-test/${testId}/questions`,
        [newQuestion],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Pytanie zostało pomyślnie dodane!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
    } catch (err) {
      setError("Błąd podczas dodawania pytania. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-question">
      <h3>❓ Dodaj nowe pytanie</h3>
      <div className="question-form">
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Wprowadź tekst pytania"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
            placeholder={`Opcja ${index + 1}`}
          />
        ))}
        <select value={answer} onChange={handleAnswerChange}>
          <option value="">Wybierz poprawną odpowiedź</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {`Opcja ${index + 1}: ${option}`}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Wysyłka..." : "Dodaj pytanie..."}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default TestQuestion;
