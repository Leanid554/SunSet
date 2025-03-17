import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const TestQuestionEdit = ({ blockTestId }) => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedAnswers, setUpdatedAnswers] = useState([]);
  const [updatedTime, setUpdatedTime] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  
  useEffect(() => {
    if (blockTestId) {
      fetchQuestions();
    }
  }, [blockTestId]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/block-test/${blockTestId}`);
      
      const questionsWithParsedOptions = response.data.questions.map((question) => ({
        ...question,
        options: question.options, 
      }));
      setQuestions(questionsWithParsedOptions);
    } catch (error) {
      alert("Błąd podczas pobierania pytań");
    }
  };

  const startEditing = (question) => {
    setEditingQuestion(question.id);
    setUpdatedText(question.question); 
    setUpdatedAnswers(question.options || []);  
    setCorrectAnswer(question.answer || ""); 
  };

  const handleAnswerChange = (index, newAnswer) => {
    const newAnswers = [...updatedAnswers];
    newAnswers[index] = newAnswer;
    setUpdatedAnswers(newAnswers);
  };

  const handleCorrectAnswerChange = (answer) => {
    setCorrectAnswer(answer);
  };

  const updateQuestion = async () => {
    if (!updatedText.trim()) {
      alert("Treść pytania nie może być pusta!");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/block-test/questions/${editingQuestion}`, {
        question: updatedText,
        options: JSON.stringify(updatedAnswers), 
        answer: correctAnswer, 
        
      });

      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion
            ? { ...q, question: updatedText, options: updatedAnswers, answer: correctAnswer }
            : q
        )
      );
      setEditingQuestion(null);
      alert("Pytanie zaktualizowane!");
    } catch (error) {
      alert("Błąd podczas aktualizacji pytania");
    }
  };

  return (
    <div>
      <h3>📌 Edycja pytań</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {editingQuestion === question.id ? (
                <div>
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    rows="3"
                    style={{ width: "100%" }}
                  />
                  <h4>Odpowiedzi</h4>
                  {updatedAnswers.map((answer, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={`Odpowiedź ${index + 1}`}
                      />
                    </div>
                  ))}
                  <button onClick={() => setUpdatedAnswers([...updatedAnswers, ""])}>Dodaj odpowiedź</button>

                  <h4>Wybierz poprawną odpowiedź</h4>
                  <select value={correctAnswer} onChange={(e) => handleCorrectAnswerChange(e.target.value)}>
                    {updatedAnswers.map((answer, index) => (
                      <option key={index} value={answer}>
                        {answer}
                      </option>
                    ))}
                  </select>

                  
                  
                  <div>
                    <button onClick={updateQuestion}>✅ Aktualizuj</button>
                    <button onClick={() => setEditingQuestion(null)}>❌ Anuluj</button>
                  </div>
                </div>
              ) : (
                <div>
                  <span>{question.question}</span>
                  <button onClick={() => startEditing(question)}>✏ Edytuj</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak pytań dla tego testu.</p>
      )}
    </div>
  );
};

export default TestQuestionEdit;
