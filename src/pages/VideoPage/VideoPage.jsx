import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './index.scss';

function VideoPage() {
  const { id } = useParams();
  const videoId = Number(id);
  const navigate = useNavigate();
  const videoRef = useRef(null); // Ссылка на элемент видео
  const [showQuestion, setShowQuestion] = useState(false); // Состояние для показа вопроса
  const [userAnswer, setUserAnswer] = useState(null); // Ответ пользователя

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

  // Функция для показа вопроса
  const showQuiz = () => {
    setShowQuestion(true);
    videoRef.current.pause(); // Ставим видео на паузу
  };

  // Функция для обработки выбора ответа
  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setShowQuestion(false);
    videoRef.current.play(); // Возобновляем воспроизведение видео
  };

  // Эффект для случайного появления вопроса
  useEffect(() => {
    const timeout = setTimeout(() => {
      showQuiz(); // Показываем вопрос через случайное время
    }, Math.random() * 5000 + 5000); // Вопрос появляется через 5-10 секунд

    return () => clearTimeout(timeout); // Очищаем таймер при размонтировании
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

  return (
    <div className="video-page">
      <h3>{lessonTitle}</h3>
      <video ref={videoRef} key={id} width="600" controls>
        <source src={`/videos/video${id}.mp4`} type="video/mp4" />
        <p>Twoja przeglądarka не obsługuje odtwarzania wideo.</p>
      </video>

      
      {/* Вопрос появляется только если showQuestion равно true */}
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

        <button className="next-button-video" onClick={goToNextLesson}>
          Dalej
        </button>
      </div>
    </div>
  );
}

export default VideoPage;
