import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function BlockPages() {
  const { id, blockId } = useParams();
  const userId = localStorage.getItem("userId");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`🆔 Aktualny identyfikator użytkownika: ${userId}`);
    console.log(
      `📚 Żądanie wykładów для идентификатора пользователя: ${userId}, Block ID: ${blockId}`
    );

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/lectures/user/${userId}/block/${blockId}`
        );

        console.log("✅ Полученные лекции:", response.data);

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

        // Проверяем, завершены ли все лекции
        const allLecturesCompleted = updatedVideos.every((video) => video.isCompleted);

        // Добавляем тест в конец списка
        updatedVideos.push({
          id: "test",
          title: "📌 Финальный тест",
          type: "test",
          locked: !allLecturesCompleted, // Тест разблокируется, если все лекции завершены
          url: `/test/${blockId}`,
        });

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Ошибка загрузки лекций");
        console.error("Ошибка:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, blockId, userId]);

  if (loading) return <p>⏳ Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={videos} mainPath="/main" />;
}

export default BlockPages;
