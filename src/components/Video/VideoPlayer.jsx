import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function VideoPlayer() {
  const { id } = useParams(); // Используем "id", так как это параметр в маршруте
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Ошибка: ID лекции не найден.");
      setLoading(false);
      return;
    }

    const fetchLectureDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Токен авторизации (если нужно)

        if (!token) {
          setError("Ошибка: Необходим токен для доступа.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/lectures/${id}/details`, // Используем "id"
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setSelectedLecture(response.data); // Сохраняем полученную лекцию
      } catch (err) {
        console.error("Ошибка загрузки лекции:", err);
        setError("Не удалось загрузить данные лекции.");
      } finally {
        setLoading(false);
      }
    };

    fetchLectureDetails();
  }, [id]); // Запрашиваем данные при изменении "id"

  if (loading) return <p>Загрузка видео...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedLecture) return <p>Лекция не найдена.</p>;

  return (
    <div>
      <h1>{selectedLecture.title}</h1>
      {selectedLecture.videoUrl ? (
        <video width="600" controls>
          <source
            src={`https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me${selectedLecture.videoUrl}`}
            type="video/mp4"
          />
          Ваш браузер не поддерживает видео.
        </video>
      ) : (
        <p>Видео не загружено.</p>
      )}
    </div>
  );
}

export default VideoPlayer;
