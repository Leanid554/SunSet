import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoQuestEdit.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestionEdit = ({ blockId, testId }) => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedAnswers, setUpdatedAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    if (blockId) {
      setQuestions([]);
      fetchQuestions();
    }
  }, [blockId]);

  const fetchQuestions = async () => {
    if (!blockId) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/block-test/${blockId}`);

      if (response.data && Array.isArray(response.data.questions)) {
        const formattedQuestions = response.data.questions.map((q) => ({
          ...q,
          options: JSON.parse(q.options), // 🔥 Фиксируем строковый массив
        }));
        setQuestions(formattedQuestions);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      alert("Błąd podczas pobierania pytań");
      setQuestions([]);
    }
  };

  const startEditing = (question) => {
    setEditingQuestionId(question.id);
    setUpdatedText(question.question);
    setUpdatedAnswers([...question.options]); // Используем реальные ответы
    setCorrectAnswer(question.answer || "");
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...updatedAnswers];
    newAnswers[index] = value;
    setUpdatedAnswers(newAnswers);
  };

  const updateQuestion = async () => {
    if (!updatedText.trim()) {
      alert("Treść pytania nie może być pusta!");
      return;
    }
    if (updatedAnswers.some((opt) => !opt.trim())) {
      alert("Wszystkie opcje odpowiedzi muszą być wypełnione!");
      return;
    }
    if (!correctAnswer.trim()) {
      alert("Wybierz poprawną odpowiedź!");
      return;
    }

    const updatedData = {
      question: updatedText,
      options: JSON.stringify(updatedAnswers), // Преобразуем обратно в строку
      answer: correctAnswer,
    };

    try {
      await axios.put(
        `${API_BASE_URL}/block-test/questions/${editingQuestionId}`,
        updatedData
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === editingQuestionId ? { ...q, ...updatedData, options: updatedAnswers } : q
        )
      );
      setEditingQuestionId(null);
      setUpdatedText("");
      setUpdatedAnswers([]);
      setCorrectAnswer("");
      alert("Pytanie zaktualizowane!");
    } catch (error) {
      alert("Błąd aktualizacji pytania");
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/block-test/questions/${id}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
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
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    style={{ width: "100%", backgroundColor: "white" }}
                    placeholder="Wprowadź tekst pytania"
                  />

                  <h4>Opcje odpowiedzi</h4>
                  {updatedAnswers.map((answer, index) => (
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={`Odpowiedź ${index + 1}`}
                        style={{ width: "100%", backgroundColor: "white" }}
                      />
                    </div>
                  ))}

                  <h4 style={{ color: "black" }}>Wybierz poprawną odpowiedź</h4>
                  <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="ButtonRedak"
                    style={{ backgroundColor: "white", color: "black" }}
                  >
                    {updatedAnswers.map((answer, index) => (
                      <option key={index} value={answer}>
                        {answer}
                      </option>
                    ))}
                  </select>

                  <div style={{ marginTop: "10px" }}>
                    <button className="ButtonRedak" onClick={updateQuestion}>
                      ✅ Zapisz
                    </button>
                    <button
                      className="ButtonRedak"
                      onClick={() => setEditingQuestionId(null)}
                    >
                      ❌ Cofnij
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <span>{question.question}</span>
                  <button
                    className="ButtonRedak"
                    onClick={() => startEditing(question)}
                  >
                    ✏ Edytuj
                  </button>
                  <button
                    className="ButtonRedak"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    ❌ Usuń
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>🔍 Do tego testu nie ma pytań.</p>
      )}
    </div>
  );
};

export default TestQuestionEdit;
