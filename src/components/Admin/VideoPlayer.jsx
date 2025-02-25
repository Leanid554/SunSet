import React, { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ videoUrl, questions }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && !paused) {
        const currentTime = videoRef.current.currentTime;
        const question = questions.find((q) => q.timestamp <= currentTime && !q.answered);
        
        if (question && !currentQuestion) {
          setCurrentQuestion(question);
          setPaused(true); // Ставим видео на паузу
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, currentQuestion, questions]);

  const handleAnswer = (answer) => {
    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      setPaused(false);
      setCurrentQuestion(null);
    }
  };

  return (
    <div>
      <video ref={videoRef} src={videoUrl} controls />
      {paused && currentQuestion && (
        <div>
          <p>{currentQuestion.question}</p>
          <input
            type="text"
            onBlur={(e) => handleAnswer(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
