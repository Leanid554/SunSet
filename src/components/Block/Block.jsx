import React from "react";
import { Link } from "react-router-dom";
import LessonList from "./LessonList";
import "./Block1.scss";

function Block({ videos, mainPath = "/main", onLectureClick }) {
  return (
    <div>
      <LessonList lessons={videos} onLectureClick={onLectureClick} />

      <div className="back-button-container">
        <Link to={mainPath} className="back-button">Назад к блокам</Link>
      </div>
    </div>
  );
}

export default Block;
