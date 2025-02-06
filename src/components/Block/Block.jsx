// Block.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

function Block({ videos, mainPath = "/main" }) {
  return (
    <div className="block-container">
      {/* "stanowisko" element */}
      <div className="stanowisko-container">
        <div className="stanowisko">stanowisko</div>
      </div>

      {/* Список видео и тестов */}
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            {/* Если это тест, открываем страницу с тестом */}
            {video.id === 51 || video.id === 52 || video.id === 53 || video.id === 54 ? (
              <Link to={`/test/${video.id}`} className="video-link">
                <div className="video-content">
                  <h3>{video.title}</h3>
                </div>
              </Link>
            ) : (
              <Link to={`/video/${video.id}`} className="video-link">
                <div className="video-content">
                  <h3>{video.title}</h3>
                  {/* Прогресс-бар */}
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${video.progress}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка "Wróć do bloków" */}
      <div className="back-button-container">
        <Link to="/main" className="back-button">Wróć do bloków</Link>
      </div>
      
    </div>
  );
}

export default Block;