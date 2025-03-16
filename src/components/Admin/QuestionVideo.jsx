import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const QuestionVideo = ({ lectureId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [timeInSeconds, setTimeInSeconds] = useState(0);

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
      timeInSeconds,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/questions`,
        questionData
      );
      alert("Pytanie zostało pomyślnie dodane!");
    } catch (error) {
      alert("Błąd podczas dodawania pytania");
    }
  };

  return (
    <div>
      <h3>Dodaj pytanie do wykładu</h3>
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
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <input
        type="text"
        placeholder="Prawidłowa odpowiedź"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <input
        type="number"
        placeholder="Czas w sekundach"
        value={timeInSeconds}
        onChange={(e) => setTimeInSeconds(parseInt(e.target.value) || 0)}
      />
      <button onClick={handleSubmit}>Dodaj pytanie</button>
    </div>
  );
};

export default QuestionVideo;
