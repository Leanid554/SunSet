import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

function TestList({ tests, allLessonsCompleted }) {
  return (
    <div className="test-container">
      {tests.map((test) => {
        const isTestDisabled = !allLessonsCompleted;

        return (
          <div key={test.id} className="video-item-wrapper">
            <Link to={`/test/${test.id}`} className={`video-item1 ${isTestDisabled ? "disabled" : ""}`}>
              <div className="video-content">
                <div className="block-row">
                  <div className="block-title">{test.title}</div>
                  <div className="position1">{test.position || "Call-Center"}</div>
                  <span className="progress-text">{test.progress}%</span>
                  <span className="access-text">{test.progress === 100 ? "tak" : "nie"}</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default TestList;
