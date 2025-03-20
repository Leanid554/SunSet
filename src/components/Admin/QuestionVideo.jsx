import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const QuestionVideo = ({ lectureId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
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

    const questionData = {
      question,
      options,
      answer,
      lectureId,
      timeInSeconds,
    };

    try {
      await axios.post(`${API_BASE_URL}/questions`, questionData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("Pytanie zostało pomyślnie dodane!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setTimeInSeconds(0);
    } catch (error) {
      setError("Błąd podczas dodawania pytania. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>❓ Dodaj pytanie do wykładu</h3>
      <input
        type="text"
        placeholder="Wprowadź pytanie"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Opcja ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e)}
        />
      ))}
      <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
        <option value="">Wybierz poprawną odpowiedź</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {`Opcja ${index + 1}: ${option}`}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Czas w sekundach"
        value={timeInSeconds}
        onChange={(e) => setTimeInSeconds(parseInt(e.target.value) || 0)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Wysyłka..." : "Dodaj pytanie"}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default QuestionVideo;
