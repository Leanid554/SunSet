import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./index.scss";
import videoQuestions from "../../data/videoQuestions"; // Подключаем вопросы

function VideoPage() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  const questions = videoQuestions[id] || []; // Загружаем вопросы по ID видео

  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const currentTime = videoElement.currentTime;
    const nextQuestion = questions.find(q => q.time <= currentTime && !answeredQuestions[q.time]);

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      videoElement.pause();
    }

    if (currentTime >= videoElement.duration - 0.5) {
      setIsVideoCompleted(true);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (currentQuestion) {
      setAnsweredQuestions(prev => ({ ...prev, [currentQuestion.time]: true }));
      setCurrentQuestion(null);
      videoRef.current.play();
    }
  };

  return (
    <div className="video-page">
      <h3>Lekcja {id}</h3>
      <video ref={videoRef} key={id} width="600" controls onTimeUpdate={handleVideoProgress}>
        <source src={`/videos/video${id}.mp4`} type="video/mp4" />
      </video>

      {currentQuestion && (
        <div className="quiz-popup">
          <h4>{currentQuestion.question}</h4>
          <div className="answers">
            {currentQuestion.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(option)}>{option}</button>
            ))}
          </div>
        </div>
      )}

      <div className="buttons-video">
        <Link to={`/block/${id}`} className="back-button1">Wrócić</Link>
        <button className="next-button-video" onClick={() => navigate(`/video/${+id + 1}`)} disabled={!isVideoCompleted}>Dalej</button>
      </div>
    </div>
  );
}

export default VideoPage;
