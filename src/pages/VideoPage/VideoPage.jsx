import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const videoId = Number(id);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

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
  } else if ([51, 52, 53, 54, 55].includes(videoId)) {
    blockId = "test";
    lessonTitle = `Test ${videoId - 50}`;
  }

  // Список вопросов с привязкой ко времени видео
  const questions = [
    { time: 5, question: "Сколько будет 2 + 2?", options: ["1", "2", "3", "4"], correct: "4" },
    { time: 10, question: "Сколько будет 3 + 3?", options: ["4", "5", "6", "7"], correct: "6" },
  ];

  // Показывать вопрос в нужный момент
  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const currentTime = videoElement.currentTime;

    // Проверяем, есть ли вопрос на текущем моменте видео и он ещё не был показан
    const nextQuestion = questions.find(
      (q) => q.time <= currentTime && !answeredQuestions[q.time]
    );

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      videoElement.pause(); // Ставим видео на паузу
    }

    // Проверка на завершение видео
    if (videoElement.currentTime >= videoElement.duration - 0.5) {
      setIsVideoCompleted(true);
    }
  };

  // Обработка ответа
  const handleAnswer = (selectedAnswer) => {
    if (currentQuestion) {
      setAnsweredQuestions((prev) => ({ ...prev, [currentQuestion.time]: true }));
      setCurrentQuestion(null);
      videoRef.current.play(); // Продолжаем видео
    }
  };

  useEffect(() => {
    setIsVideoCompleted(false);
    setAnsweredQuestions({});
    setCurrentQuestion(null);
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
        <p>Twoja przeglądarka nie obsługuje odtwarzania wideo.</p>
      </video>

      {/* Вопрос появляется в нужный момент */}
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
        {blockId === "test" ? (
          <Link to={`/test/${id}`} className="back-button1">
            Wrócić
          </Link>
        ) : (
          <Link to={`/block/${blockId}`} className="back-button1">
            Wrócić
          </Link>
        )}

        <button className="next-button-video" onClick={goToNextLesson} disabled={!isVideoCompleted}>
          Dalej
        </button>
      </div>
    </div>
  );
}

export default VideoPage;
