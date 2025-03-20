import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoQuestEdit.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const VideoQuestEdit = ({ lectureId }) => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedAnswers, setUpdatedAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lectureId) {
      fetchQuestions();
    }
  }, [lectureId]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/questions/lecture/${lectureId}`
      );
      setQuestions(response.data);
    } catch (error) {
      alert("Błąd podczas przesyłania pytań");
    }
  };

  const startEditing = (question) => {
    setEditingQuestionId(question.id);
    setUpdatedText(question.question);
    setUpdatedAnswers(question.options || ["", "", "", ""]);
    setCorrectAnswer(question.answer || "");
    setUpdatedTime(
      question.timeInSeconds ? String(question.timeInSeconds) : ""
    );
    setError("");
    setSuccess("");
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...updatedAnswers];
    newAnswers[index] = value;
    setUpdatedAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleTimeChange = (event) => {
    setUpdatedTime(event.target.value);
  };

  const handleSubmit = async () => {
    if (
      !updatedText.trim() ||
      updatedAnswers.some((opt) => !opt.trim()) ||
      !correctAnswer.trim()
    ) {
      setError("Proszę uzupełnić wszystkie pola.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updatedData = {
        question: updatedText,
        options: updatedAnswers,
        answer: correctAnswer,
        timeInSeconds: updatedTime ? Number(updatedTime) : undefined,
      };

      await axios.put(
        `${API_BASE_URL}/questions/${editingQuestionId}`,
        updatedData
      );

      setQuestions(
        questions.map((q) =>
          q.id === editingQuestionId ? { ...q, ...updatedData } : q
        )
      );
      setEditingQuestionId(null);
      setSuccess("Pytanie zostało pomyślnie zaktualizowane!");
    } catch (error) {
      setError("Błąd aktualizacji pytania. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/questions/${id}`);
      setQuestions(questions.filter((question) => question.id !== id));
      alert("Pytanie zostało usunięte!");
    } catch (error) {
      alert("Błąd usuwania pytania");
    }
  };

  return (
    <div>
      <h3>📌 Edycja pytań</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {editingQuestionId === question.id ? (
                <div className="test-question">
                  <h4>Tekst pytania</h4>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    placeholder="Wprowadź tekst pytania"
                  />

                  <h4>Opcje odpowiedzi</h4>
                  {updatedAnswers.map((answer, index) => (
                    <input
                      key={index}
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      placeholder={`Opcja ${index + 1}`}
                    />
                  ))}

                  <h4>Wybierz poprawną odpowiedź</h4>
                  <select
                    value={correctAnswer}
                    onChange={handleCorrectAnswerChange}
                  >
                    <option value="">Wybierz poprawną odpowiedź</option>
                    {updatedAnswers.map((answer, index) => (
                      <option key={index} value={answer}>
                        {answer}
                      </option>
                    ))}
                  </select>

                  <h4>Czas reakcji (sek)</h4>
                  <input
                    type="number"
                    value={updatedTime}
                    onChange={handleTimeChange}
                    placeholder="Wprowadź czas"
                  />

                  <div>
                    <button onClick={handleSubmit} disabled={loading}>
                      {loading ? "Zapisuję..." : "Zapisz zmiany"}
                    </button>
                    <button onClick={() => setEditingQuestionId(null)}>
                      ❌ Anuluj
                    </button>
                  </div>

                  {error && <p className="error">{error}</p>}
                  {success && <p className="success">{success}</p>}
                </div>
              ) : (
                <div>
                  <span>{question.question}</span>
                  <button onClick={() => startEditing(question)}>
                    ✏ Edytuj
                  </button>
                  <button onClick={() => deleteQuestion(question.id)}>
                    ❌ Usuń
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Do tego wykładu nie ma pytań.</p>
      )}
    </div>
  );
};

export default VideoQuestEdit;
