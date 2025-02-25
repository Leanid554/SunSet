import React, { useState, useRef } from 'react';
import axios from 'axios';

// Компонент для видео с вопросами
const VideoWithQuestions = ({ lectureId, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null); // Текущий вопрос
  const [isPaused, setIsPaused] = useState(false); // Статус паузы
  const videoRef = useRef(null); // Ссылка на элемент видео

  const handleQuestionAnswered = (isCorrect) => {
    // Если ответ правильный, продолжаем видео
    if (isCorrect) {
      setIsPaused(false);
      videoRef.current.play();
    } else {
      alert('Неправильный ответ!');
    }
    setCurrentQuestion(null); // Скрыть вопрос после ответа
  };

  // При клике на видео ставим вопрос
  const handleVideoClick = (timestamp) => {
    const questionAtTimestamp = questions.find(
      (q) => q.timestamp === timestamp
    );

    if (questionAtTimestamp) {
      setCurrentQuestion(questionAtTimestamp);
      setIsPaused(true);
      videoRef.current.pause();
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls
        onClick={(e) => handleVideoClick(Math.floor(e.target.currentTime))}
        src="your-video-url.mp4"
      >
        Ваш браузер не поддерживает видео
      </video>

      {/* Отображаем вопрос поверх видео */}
      {currentQuestion && (
        <div className="question-overlay">
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option, index) => (
              <button key={index} onClick={() => handleQuestionAnswered(option === currentQuestion.answer)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Основной компонент с добавлением вопросов
const AddQuestionToVideo = ({ lectureId }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState('');
//   const [timestamp, setTimestamp] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = async () => {
    // if (!question || !answer || !timestamp || options.length === 0) {
    //   alert('Пожалуйста, заполните все поля');
    //   return;
    // }

    try {

      const response = await axios.post('https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/questions', {
        question,
        options,
        answer,
        lectureId,
      });

      setQuestions([...questions, response.data]);
      alert('Вопрос добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении вопроса:', error);
      alert('Ошибка при добавлении вопроса');
    }
  };

  return (
    <div>
      <h2>Добавить вопрос</h2>
      <input
        type="text"
        placeholder="Вопрос"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ответ"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      {/* <input
        type="number"
        placeholder="Таймстамп (в секундах)"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      /> */}
      <input
        type="text"
        placeholder="Опция"
        onBlur={(e) => setOptions([...options, e.target.value])}
      />
      <button onClick={handleAddQuestion}>Добавить вопрос</button>

      <VideoWithQuestions lectureId={lectureId} questions={questions} />
    </div>
  );
};

export default AddQuestionToVideo;
