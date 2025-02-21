import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import videoQuestions from "../../data/videoQuestions"; // 🔥 Импортируем вопросы
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const videoId = Number(id);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);

  let blockId = null;
  let lessonTitle = `Lekcja ${videoId % 10}`;

  if (videoId >= 10 && videoId <= 19) {
    blockId = 1;
  } else if (videoId >= 20 && videoId <= 29) {
    blockId = 2;
  } else if (videoId >= 30 && videoId <= 39) {
    blockId = 3;
  } else if (videoId >= 40 && videoId <= 49) {
    blockId = 4;
  } else if (videoId >= 60 && videoId <= 69) {
    blockId = 5;
  }

  // 🔥 Берём вопросы для текущего видео из videoQuestions
  const questions = videoQuestions[videoId] || [];

  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const currentTime = videoElement.currentTime;

    // Найти вопрос по текущему времени, если он ещё не был задан
    const nextQuestion = questions.find(
      (q) => q.time <= currentTime && !answeredQuestions[q.time]
    );

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      videoElement.pause();
    }

    // Если видео дошло до конца
    if (videoElement.currentTime >= videoElement.duration - 0.5) {
      setIsVideoCompleted(true);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (currentQuestion) {
      if (selectedAnswer === currentQuestion.correct) {
        setCorrectAnswers((prev) => prev + 1);
      }

      setAnsweredQuestions((prev) => ({ ...prev, [currentQuestion.time]: true }));
      setCurrentQuestion(null);
      videoRef.current.play();
    }
  };

  useEffect(() => {
    setIsVideoCompleted(false);
    setAnsweredQuestions({});
    setCurrentQuestion(null);
    setCorrectAnswers(0);
  }, [id]);

  const goToNextLesson = () => {
    const nextVideoId = videoId + 1;

    if ((blockId === 1 && nextVideoId <= 19) ||
        (blockId === 2 && nextVideoId <= 29) ||
        (blockId === 3 && nextVideoId <= 39) ||
        (blockId === 4 && nextVideoId <= 49)) {
      navigate(`/video/${nextVideoId}`);
    }
  };

  const hasEnoughCorrectAnswers = correctAnswers >= 2;

  return (
    <div className="video-page">
      <h3>{lessonTitle}</h3>
      <video
        ref={videoRef}
        key={id}
        width="600"
        controls
        onTimeUpdate={handleVideoProgress}
      >
        <source src={`/videos/video${id}.mp4`} type="video/mp4" />
        <p>Twoja przeglądarka nie obsługuje odtwarzania вideo.</p>
      </video>

      {/* Вопрос */}
      {currentQuestion && (
        <div className="quiz-popup">
          <h4>{currentQuestion.question}</h4>
          <div className="answers">
            {currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="buttons-video">
        {/* Если ответил < 2 вопросов – "Wróć do lekcji" */}
        {!hasEnoughCorrectAnswers && isVideoCompleted && (
          <Link to={`/block/${blockId}`} className="back-button1">
            Wróć do lekcji
          </Link>
        )}

        {/* Если 2+ ответа правильные и видео просмотрено – можно идти дальше */}
        {hasEnoughCorrectAnswers && isVideoCompleted && (
          <button className="next-button-video" onClick={goToNextLesson}>
            Dalej
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoPage;
