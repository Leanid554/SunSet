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
        console.log("✅ Otrzymane wykłady:", response.data);

        let updatedVideos = response.data.map((lecture, index) => ({
          ...lecture,
          locked: index !== 0,
        }));

        for (let i = 0; i < updatedVideos.length; i++) {
          if (i === 0) {
            updatedVideos[i].locked = false;
          } else {
            const prevLecture = updatedVideos[i - 1];
            const currentLecture = updatedVideos[i];

            if (prevLecture.isAccessible && currentLecture.isAccessible) {
              updatedVideos[i].locked = false;
            }
          }
        }

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Бłąд pobierania wykładów");
        console.error("Błąd:", err.response?.data || err.message);
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
        console.error("Ошибка при получении теста:", err.response?.data || err.message);
      }
    };

    fetchVideos();
    fetchTestForBlock();
  }, [blockId, userId]);

  if (loading) return <p>⏳ Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Block videos={videos} mainPath="/main" />
      {testAvailable && (
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
