import React from "react";
import { Link } from "react-router-dom";
import LessonList from "./LessonList";
import TestList from "./TestList";
import "./Block1.scss";

function Block({ videos, mainPath = "/main", onLectureClick }) {
  const lessons = videos.filter(video => video.id < 51 || video.id > 55);
  const tests = videos.filter(video => video.id >= 51 && video.id <= 55);

  const allLessonsCompleted = lessons.every(lesson => lesson.progress === 100);

  return (
    <div>
      <LessonList lessons={lessons} onLectureClick={onLectureClick} />
      <TestList tests={tests} allLessonsCompleted={allLessonsCompleted} />

      <div className="back-button-container">
        <Link to={mainPath} className="back-button">Wróć do bloków</Link>
      </div>
    </div>
  );
}

export default Block;
