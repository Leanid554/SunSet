import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

function LessonList({ lessons, onLectureClick }) {
  return (
    <div className="block-container block-height">
      <div className="block-header-row">
        <div className="block-label">Tytuł</div>
        <div className="position-label">Pozycja</div>
        <div className="progress-label">Progress</div>
        <div className="access-label">Dostęp</div>
      </div>

      <div className="video-list-container">
        {lessons.map((video) => (
          <div key={video.id} className={`video-item-wrapper ${video.locked ? "locked" : ""}`}>
            {video.locked ? (
              <div className="video-item locked">
                <div className="video-content">
                  <div className="block-row">
                    <div className="block-title">{video.title}</div>
                    <div className="position1">{video.position || "Call-Center"}</div>
                    <span className="progress-text">{video.progress}%</span>
                    <span className="access-text">🔒</span>
                  </div>
                </div>
              </div>
            ) : (
              <Link to={`/video/${video.id}`} className="video-item" onClick={() => onLectureClick(video)}>
                <div className="video-content">
                  <div className="block-row">
                    <div className="block-title">{video.title}</div>
                    <div className="position1">{video.position || "Call-Center"}</div>
                    <span className="progress-text">{video.progress}%</span>
                    <span className="access-text">🔓</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonList;
