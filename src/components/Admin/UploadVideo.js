import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

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
      alert("Wybierz wideo do pobrania.");
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
      alert("Wideo przesłane pomyślnie!");
    } catch (error) {
      // Обработка ошибок
      console.error("Błąd podczas przesyłania wideo:", error);
      alert("Błąd podczas przesyłania wideo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Ładowanie..." : "Przesyłanie wideo"}
      </button>
    </div>
  );
};

export default UploadVideo;
