import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block"; // Компонент для отображения блока

const API_BASE_URL = process.env.REACT_APP_API_URL;

function BlockPages() {
  const { blockId } = useParams(); // Получаем blockId из параметров URL
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testAvailable, setTestAvailable] = useState(false); // Стейт для проверки доступности теста

  useEffect(() => {
    if (!blockId) {
      setError("❌ Неверный идентификатор блока");
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/lectures/user/${userId}/block/${blockId}`
        );
        console.log("✅ Полученные лекции:", response.data);

        let updatedVideos = response.data.map((lecture, index) => {
          const isPreviousLectureCompleted =
            index === 0 || response.data[index - 1]?.isCompleted; // Проверка завершенности предыдущей лекции

          // Если лекция доступна по isAccessible, но предыдущая не завершена, она будет заблокирована
          const locked = !isPreviousLectureCompleted || !lecture.isAccessible;

          return {
            ...lecture,
            locked, // Блокируем лекцию, если предыдущая не завершена или эта лекция недоступна
          };
        });

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Ошибка загрузки лекций");
        console.error("Ошибка:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTestForBlock = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/block-test/${blockId}`
        );
        if (response.data?.questions?.length > 0) {
          setTestAvailable(true);
        }
      } catch (err) {
        console.error(
          "Ошибка при получении теста:",
          err.response?.data || err.message
        );
      }
    };

    fetchVideos();
    fetchTestForBlock();
  }, [blockId, userId]);

  // Функция для проверки, все ли лекции пройдены
  const areAllLecturesAccessible = videos.every((video) => video.isCompleted);

  // Если все лекции пройдены, тест становится доступным
  const isTestEnabled = areAllLecturesAccessible && testAvailable;

  if (loading) return <p>⏳ Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Block blockId={blockId} videos={videos} mainPath="/main" />
      {/* Показываем кнопку для теста только если все лекции доступны */}
      {isTestEnabled && (
        <div className="test-link">
          <button
            onClick={() => navigate(`/test/${blockId}`)} // Передаем blockId как часть URL
            className="go-to-test-button"
          >
            Пройти тест для этого блока
          </button>
        </div>
      )}
    </div>
  );
}

export default BlockPages;
