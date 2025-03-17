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
      console.error("Ошибка загрузки вопросов:", error);
      alert("Ошибка при загрузке вопросов");
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
      alert("Текст вопроса не может быть пустым!");
      return;
    }
    if (updatedAnswers.length === 0 || updatedAnswers.some((opt) => !opt.trim())) {
      alert("Добавьте хотя бы один вариант ответа!");
      return;
    }
    if (!correctAnswer.trim()) {
      alert("Выберите правильный ответ!");
      return;
    }
    if (!updatedTime.trim() || isNaN(updatedTime) || Number(updatedTime) < 0) {
      alert("Введите корректное время на ответ!");
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
      alert("Вопрос обновлён!");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      alert("Ошибка обновления вопроса");
    }
  };

  return (
    <div>
      <h3>📌 Редактирование вопросов</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {editingQuestionId === question.id ? (
                <div>
                  <h4>Текст вопроса</h4>
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    rows="3"
                    style={{ width: "100%" }}
                  />

                  <h4>Варианты ответов</h4>
                  {updatedAnswers.map((answer, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={`Ответ ${index + 1}`}
                        style={{ flex: 1 }}
                      />
                      <button className="ButtonRedak2" onClick={() => removeAnswer(index)}>❌</button>
                    </div>
                  ))}
                  <button className="ButtonRedak" onClick={addAnswer}>➕ Добавить ответ</button>

                  <h4>Выберите правильный ответ</h4>
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

                  <h4>Время на ответ (секунды)</h4>
                  <input
                    type="number"
                    value={updatedTime}
                    onChange={(e) => setUpdatedTime(e.target.value)}
                    placeholder="Введите время"
                    className="ButtonRedak"
                  />

                  <div style={{ marginTop: "10px" }}>
                    <button className="ButtonRedak" onClick={updateQuestion}>✅ Сохранить</button>
                    <button className="ButtonRedak" onClick={() => setEditingQuestionId(null)}>❌ Отмена</button>
                  </div>
                </div>
              ) : (
                <div>
                  <span>{question.question}</span>
                  <button className="ButtonRedak" onClick={() => startEditing(question)}>✏ Редактировать</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет вопросов для этой лекции.</p>
      )}
    </div>
  );
};

export default VideoQuestEdit;
