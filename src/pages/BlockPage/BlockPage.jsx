import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

function BlockPages() {
  const { id, blockId } = useParams(); 
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Получаем токен
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`🆔 Текущий пользователь ID: ${userId}`);
    console.log(`📚 Запрашиваем лекции для пользователя ID: ${id}, Блок ID: ${blockId}`);

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lectures/user/${id}/block/${blockId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("✅ Полученные лекции:", response.data);
        setVideos(response.data);

        // Проверяем статус прохождения для каждой лекции
        response.data.forEach(async (lecture) => {
          try {
            const progressResponse = await axios.post(
              `${API_BASE_URL}/lectures/${lecture.id}/complete/${userId}`,
              { passed: false }, // Можно заменить на true, если хочешь тестировать успешное завершение
              { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log(`📌 Лекция ID: ${lecture.id}, Пройдено: ${progressResponse.data.passed}`);
          } catch (progressError) {
            console.error(`❌ Ошибка проверки статуса лекции ${lecture.id}:`, progressError.response?.data || progressError.message);
          }
        });

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
