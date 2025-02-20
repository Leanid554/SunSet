import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

// Функция для вычисления прогресса блока на основе прогресса видео
const calculateBlockProgress = (videos) => {
  if (videos.length === 0) return 0; // Если нет видео, прогресс 0

  // Суммируем прогрессы всех видео и считаем их средний прогресс
  const totalProgress = videos.reduce((acc, video) => acc + video.progress, 0);
  return Math.round(totalProgress / videos.length); // Возвращаем средний прогресс блока
};

function Block({ videos, mainPath = "/main" }) {
  return (
    <div className="block-container">
      {/* Заголовки таблицы */}
      <div className="block-header-row">
        <div className="block-label">Nazwa</div>
        <div className="position-label">Stanowisko</div>
        <div className="progress-label">Procent</div>
        <div className="access-label">Dostęp</div>
      </div>

      {/* Список видео */}
      {videos.map((video) => {
        const blockProgress = video.progress; // Прогресс видео

        return (
          <Link
            to={video.id >= 51 && video.id <= 54 ? `/test/${video.id}` : `/video/${video.id}`}
            key={video.id}
            className={`video-item ${blockProgress === 100 ? "" : "disabled"}`}
          >
            <div className="video-content">
              <div className="block-row">
                <div className="block-title">{video.title}</div>
                <div className="position">{video.position || "Call-Center"}</div>
                <span className="progress-text">{blockProgress}%</span>
                <span className="access-text">{blockProgress === 100 ? "tak" : "nie"}</span>
              </div>
            </div>
          </Link>
        );
      })}

      <div className="back-button-container">
        <Link to={mainPath} className="back-button">
          Wróć do bloków
        </Link>
      </div>
    </div>
  );
}

export default Block;
