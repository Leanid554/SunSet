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
        const response = await axios.get(`${API_BASE_URL}/lectures/user/${id}/block/${blockId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Полученные лекции:", response.data);

        let updatedVideos = response.data.map((lecture, index) => ({
          ...lecture,
          locked: index !== 0, // Первая лекция всегда открыта, остальные - заблокированы
          passed: false, // Изначально считаем, что лекция не пройдена
        }));

        // Проверяем статусы всех лекций
        for (let i = 0; i < updatedVideos.length; i++) {
          try {
            const progressResponse = await axios.post(
              `${API_BASE_URL}/lectures/${updatedVideos[i].id}/complete/${userId}`,
              {}, // ❗ Пустой объект, так как мы только проверяем статус
              { headers: { Authorization: `Bearer ${token}` } }
            );

            updatedVideos[i].passed = progressResponse.data.passed || false;
            console.log(`📌 Лекция ID: ${updatedVideos[i].id} | Пройдено: ${updatedVideos[i].passed}`);

            // Разблокируем следующую лекцию, если текущая пройдена
            if (i < updatedVideos.length - 1 && updatedVideos[i].passed) {
              updatedVideos[i + 1].locked = false;
            }
          } catch (progressError) {
            console.error(`❌ Ошибка проверки статуса лекции ${updatedVideos[i].id}:`, progressError.response?.data || progressError.message);
          }
        }

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Ошибка загрузки лекций");
        console.error("Ошибка:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, blockId, userId, token]);

  if (loading) return <p>⏳ Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={videos} mainPath="/main" />;
}

export default BlockPages;
