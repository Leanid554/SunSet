import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LessonList from "./LessonList";
import "./Block1.scss";

function Block({ blockId, videos, mainPath = "/main", onLectureClick }) {
  return (
    <div>
      <LessonList
        blockId={blockId}
        lessons={videos}
        onLectureClick={onLectureClick}
      />
      <div className="back-button-container">
        <Link to={mainPath} className="back-button">
          Powrót do bloków
        </Link>
      </div>
    </div>
  );
}

export default Block;
