import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Block1.scss";

function LessonList({ blockId, lessons, onLectureClick }) {
  const navigate = useNavigate();

  // Sprawdzenie, czy wszystkie wykłady zostały ukończone
  const areAllLecturesCompleted = lessons.every((video) => video.passed);

  return (
    <div className="block-container block-height">
      <div className="block-header-row">
        <div className="block-label">Tytuł</div>
        <div className="position-label">Pozycja</div>
        <div className="access-label">Dostęp</div>
      </div>

      <div className="video-list-container">
        {lessons.map((video, index) => {
          // Blokowanie wykładu, jeśli jest niedostępny (isAccessible === false)
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
                        {video.position || "Call-Center"}
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
                      <div className="position1">
                        {video.position || "Call-Center"}
                      </div>
                      <span className="access-text">🔓</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}

        {/* Przycisk testu dostępny tylko wtedy, gdy wszystkie wykłady zostały ukończone */}
        <div className="test-link">
          <button
            onClick={() => navigate(`/test/${blockId}`)} // Przekazujemy blockId jako część URL
            className={`go-to-test-button ${
              areAllLecturesCompleted ? "active" : "disabled"
            }`} // Dodajemy klasę w zależności od ukończenia wykładów
            disabled={!areAllLecturesCompleted} // Uczynienie przycisku nieaktywnym, jeśli nie wszystkie wykłady zostały ukończone
          >
            Zrób test dla tego bloku
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonList;
