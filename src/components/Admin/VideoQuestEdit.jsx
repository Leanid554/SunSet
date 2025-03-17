import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoQuestEdit.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const VideoQuestEdit = ({ lectureId }) => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedAnswers, setUpdatedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");

  useEffect(() => {
    if (lectureId) {
      fetchQuestions();
    }
  }, [lectureId]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/questions/lecture/${lectureId}`);
      setQuestions(response.data);
    } catch (error) {
      alert("Błąd podczas przesyłania pytań");
    }
  };

  const startEditing = (question) => {
    setEditingQuestionId(question.id);
    setUpdatedText(question.question);
    setUpdatedAnswers(question.options || []);
    setCorrectAnswer(question.answer || "");
    setUpdatedTime(question.timeInSeconds ? String(question.timeInSeconds) : "");
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...updatedAnswers];
    newAnswers[index] = value;
    setUpdatedAnswers(newAnswers);
  };

  const addAnswer = () => {
    setUpdatedAnswers([...updatedAnswers, ""]);
  };

  const removeAnswer = (index) => {
    setUpdatedAnswers(updatedAnswers.filter((_, i) => i !== index));
  };

  const updateQuestion = async () => {
    if (!updatedText.trim()) {
      alert("Tekst pytania nie może być pusty!");
      return;
    }
    if (updatedAnswers.length === 0 || updatedAnswers.some((opt) => !opt.trim())) {
      alert("Dodaj co najmniej jedną odpowiedź!");
      return;
    }
    if (!correctAnswer.trim()) {
      alert("Wybierz poprawną odpowiedź!");
      return;
    }
    if (!updatedTime.trim() || isNaN(updatedTime) || Number(updatedTime) < 0) {
      alert("Wprowadź prawidłowy czas reakcji!");
      return;
    }

    try {
      const updatedData = {
        question: updatedText,
        options: updatedAnswers,
        answer: correctAnswer,
        timeInSeconds: Number(updatedTime),
        lectureId: Number(lectureId),
      };

      await axios.put(`${API_BASE_URL}/questions/${editingQuestionId}`, updatedData);
      setQuestions(questions.map((q) => (q.id === editingQuestionId ? { ...q, ...updatedData } : q)));
      setEditingQuestionId(null);
      alert("Pytanie zaktualizowane!");
    } catch (error) {
      alert("Błąd aktualizacji pytania");
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
                <div>
                  <h4>Tekst pytania</h4>
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    rows="3"
                    style={{ width: "100%", backgroundColor: "white" }}
                  />

                  <h4>Opcje odpowiedzi</h4>
                  {updatedAnswers.map((answer, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={`Odpowiedź ${index + 1}`}
                        style={{ flex: 1, backgroundColor: "white" }}
                      />
                      <button className="ButtonRedak2" onClick={() => removeAnswer(index)}>❌</button>
                    </div>
                  ))}
                  <button className="ButtonRedak" onClick={addAnswer}>➕ Dodaj odpowiedź</button>

                  <h4>Wybierz poprawną odpowiedź</h4>
                  <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="ButtonRedak"
                  >
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
                    onChange={(e) => setUpdatedTime(e.target.value)}
                    placeholder="Wprowadź czas"
                    className="ButtonRedak3"
                  />

                  <div style={{ marginTop: "10px" }}>
                    <button className="ButtonRedak" onClick={updateQuestion}>✅ Zapisz</button>
                    <button className="ButtonRedak" onClick={() => setEditingQuestionId(null)}>❌ Cofnij</button>
                  </div>
                </div>
              ) : (
                <div>
                  <span>{question.question}</span>
                  <button className="ButtonRedak" onClick={() => startEditing(question)}>✏ Edytuj</button>
                  <button className="ButtonRedak" onClick={() => deleteQuestion(question.id)}>❌ Usuń</button>
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
