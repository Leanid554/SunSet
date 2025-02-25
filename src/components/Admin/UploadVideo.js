import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const UploadVideo = ({ lectureId }) => {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Обработчик выбора файла
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Обработчик загрузки видео
  const handleUpload = async () => {
    if (!video) {
      alert("Выберите видео для загрузки.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    setUploading(true);

    try {
      // Отправляем запрос на загрузку видео для конкретной лекции
      const response = await axios.post(
        `${API_BASE_URL}/lectures/${lectureId}/upload-video`, // URL с ID лекции
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Успешная загрузка
      alert("Видео загружено успешно!");
    } catch (error) {
      // Обработка ошибок
      console.error("Ошибка при загрузке видео:", error);
      alert("Ошибка при загрузке видео");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Загрузка..." : "Загрузить видео"}
      </button>
    </div>
  );
};

export default UploadVideo;
