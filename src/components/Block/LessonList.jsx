import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Block1.scss";

function LessonList({ blockId, lessons, onLectureClick }) {
  const navigate = useNavigate();

  const areAllLecturesCompleted = lessons.every((video) => video.passed);

  const userRole = sessionStorage.getItem("role");

  return (
    <div className="block-container block-height">
      <div className="block-header-row">
        <div className="block-label">Tytuł</div>
        <div className="position-label">Pozycja</div>
        <div className="access-label">Dostęp</div>
      </div>

      <div className="video-list-container">
        {lessons.map((video) => {
          const locked = !video.isAccessible;

          return (
            <div
              key={video.id}
              className={`video-item-wrapper ${locked ? "locked" : ""}`}
            >
              {locked ? (
                <div className="video-item locked">
                  <div className="video-content">
                    <div className="block-row">
                      <div className="block-title">{video.title}</div>
                      <div className="position1">
                      <div className="position1">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</div>
                      </div>
                      <span className="access-text">🔒</span>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={`/video/${video.id}`}
                  className="video-item"
                  onClick={() => onLectureClick(video)}
                >
                  <div className="video-content">
                    <div className="block-row">
                      <div className="block-title">{video.title}</div>
                      <div className="position1">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</div> 
                      <span className="access-text">🔓</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}

        <div className="test-link">
          <button
            onClick={() => navigate(`/test/${blockId}`)}
            className={`go-to-test-button ${
              areAllLecturesCompleted ? "active" : "disabled"
            }`}
            disabled={!areAllLecturesCompleted}
          >
            Zrób test dla tego bloku
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonList;
