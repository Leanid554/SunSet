import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VideoQuestEdit.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestionEdit = ({ blockId, testId }) => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedAnswers, setUpdatedAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    if (blockId) {
      console.log(`🔄 Выбран тест с ID: ${blockId}`);
      setQuestions([]); // Очищаем вопросы перед загрузкой новых
      fetchQuestions();
    }
  }, [blockId]);

  const fetchQuestions = async () => {
    if (!blockId) return;

    try {
      console.log(`📡 Запрос вопросов для теста ${blockId}`);
      const response = await axios.get(`${API_BASE_URL}/block-test/${blockId}`);
      console.log("📨 Ответ сервера:", response.data);

      if (response.data && Array.isArray(response.data.questions)) {
        setQuestions(response.data.questions);
      } else {
        console.warn("⚠ Сервер не вернул вопросы или формат некорректен.");
        setQuestions([]);
      }
    } catch (error) {
      console.error("❌ Ошибка загрузки вопросов:", error);
      alert("Błąd podczas pobierania pytań");
      setQuestions([]); // Если ошибка, очищаем список вопросов
    }
  };

  const startEditing = (question) => {
    setEditingQuestionId(question.id);
    setUpdatedText(question.question);
    setUpdatedAnswers(
      question.options.length === 4 ? [...question.options] : ["", "", "", ""]
    );
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
      options: updatedAnswers,
      answer: correctAnswer,
    };

    try {
      await axios.put(
        `${API_BASE_URL}/block-test/questions/${editingQuestionId}`,
        updatedData
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === editingQuestionId ? { ...q, ...updatedData } : q
        )
      );
      setEditingQuestionId(null);
      setUpdatedText("");
      setUpdatedAnswers(["", "", "", ""]);
      setCorrectAnswer("");
      alert("Pytanie zaktualizowane!");
    } catch (error) {
      console.error("❌ Ошибка обновления вопроса:", error);
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
      console.error("❌ Ошибка удаления вопроса:", error);
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
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
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
