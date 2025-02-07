import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './index.scss';

function VideoPage() {
  const { id } = useParams();
  const videoId = Number(id);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

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
  } else if ([51, 52, 53, 54].includes(videoId)) {
    blockId = 'test';
    lessonTitle = `Test ${videoId - 50}`;
  }

  const showQuiz = () => {
    setShowQuestion(true);
    videoRef.current.pause();
  };

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setShowQuestion(false);
    videoRef.current.play();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showQuiz();
    }, Math.random() * 5000 + 5000);

    return () => clearTimeout(timeout);
  }, [id]);

  const goToNextLesson = () => {
    const nextVideoId = videoId + 1;
    let nextBlockVideoId = nextVideoId;

    if (blockId === 1 && nextVideoId <= 19) {
      nextBlockVideoId = nextVideoId;
    } else if (blockId === 2 && nextVideoId <= 29) {
      nextBlockVideoId = nextVideoId;
    } else if (blockId === 3 && nextVideoId <= 39) {
      nextBlockVideoId = nextVideoId;
    } else if (blockId === 4 && nextVideoId <= 49) {
      nextBlockVideoId = nextVideoId;
    } else {
      return;
    }

    navigate(`/video/${nextBlockVideoId}`);
  };

  // Обработка завершения видео с учетом погрешности
  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.currentTime >= videoElement.duration - 0.5) {
      setIsVideoCompleted(true);
    }
  };

  // Сброс состояния при смене видео
  useEffect(() => {
    setIsVideoCompleted(false);
  }, [id]);

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
        <p>Twoja przeglądarka не obsługuje odtwarzania wideo.</p>
      </video>

      {showQuestion && (
        <div className="quiz-popup">
          <h4>Сколько будет 2 + 2?</h4>
          <div className="answers">
            <button onClick={() => handleAnswer(1)}>1</button>
            <button onClick={() => handleAnswer(2)}>2</button>
            <button onClick={() => handleAnswer(3)}>3</button>
            <button onClick={() => handleAnswer(4)}>4</button>
          </div>
        </div>
      )}

      <div className="buttons-video">
        {blockId === 'test' ? (
          <Link to={`/test/${id}`} className="back-button1">
            Wrócić
          </Link>
        ) : (
          <Link to={`/block/${blockId}`} className="back-button1">
            Wrócić
          </Link>
        )}

        {/* Блокировка кнопки до завершения видео */}
        <button className="next-button-video" onClick={goToNextLesson} disabled={!isVideoCompleted}>
          Dalej
        </button>
      </div>
    </div>
  );
}

export default VideoPage;
