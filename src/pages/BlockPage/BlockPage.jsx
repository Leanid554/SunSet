import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

function BlockPages() {
  const { id, blockId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`🆔 Текущий пользователь ID: ${userId}`);
    console.log(`📚 Запрашиваем лекции для пользователя ID: ${id}, Блок ID: ${blockId}`);

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lectures/user/${userId}/block/${blockId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Полученные лекции:", response.data);

        let updatedVideos = response.data.map((lecture, index) => ({
          ...lecture,
          locked: index !== 0, // Все лекции, кроме первой, заблокированы
          passed: lecture.passed || false, // Используем полученные данные о статусе
        }));

        // Разблокируем следующую лекцию, если предыдущая пройдена
        for (let i = 0; i < updatedVideos.length - 1; i++) {
          if (updatedVideos[i].passed) {
            updatedVideos[i + 1].locked = false;
          }
        }

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Błąd pobierania wykładów");
        console.error("Błąd:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, blockId, userId, token]);

  if (loading) return <p>⏳ Ładowanie...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={videos} mainPath="/main" />;
}

export default BlockPages;