import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Test from "../../components/Test/Test"; // Ваш компонент для отображения теста
import "./TestPage.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function TestPage() {
  const { blockId } = useParams(); // Получаем blockId из параметров URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blockId) {
      setError("❌ Неверный идентификатор блока");
      setLoading(false);
      return;
    }

    const fetchTestQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/block-test/${blockId}`);
        
        console.log("Полученные данные с API:", response.data);

        if (response.data && response.data.questions && Array.isArray(response.data.questions)) {
          // Преобразуем строки в массивы
          const updatedQuestions = response.data.questions.map((question) => {
            return {
              ...question,
              options: JSON.parse(question.options), // Преобразуем строку в массив
            };
          });

          setQuestions(updatedQuestions); // Сохраняем вопросы с правильно преобразованными опциями
        } else {
          setError("❌ Вопросы для этого теста не найдены или данные имеют неверный формат");
        }
      } catch (err) {
        setError("❌ Ошибка загрузки теста");
        console.error("Ошибка:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestQuestions();
  }, [blockId]);

  if (loading) return <p>⏳ Загрузка теста...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="test-page">
      <h2>Тест для блока {blockId}</h2>
      <Test questions={questions} blockId={blockId} />
    </div>
  );
}

export default TestPage;
