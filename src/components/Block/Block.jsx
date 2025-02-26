import React from "react";
import { Link } from "react-router-dom";
import LessonList from "./LessonList";
import TestList from "./TestList";
import "./Block1.scss";

function Block({ videos, mainPath = "/main", onLectureClick }) {
  const lessons = videos.filter(video => video.type !== "test");
  const tests = videos.filter(video => video.type === "test");

  return (
    <div>
      <LessonList lessons={lessons} onLectureClick={onLectureClick} />
      <TestList tests={tests} allLessonsCompleted={false} />

      <div className="back-button-container">
        <Link to={mainPath} className="back-button">Назад к блокам</Link>
      </div>
    </div>
  );
}

export default Block;
