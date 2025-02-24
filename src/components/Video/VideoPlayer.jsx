import React, { useRef, useEffect } from "react";

function VideoPlayer({ videoId, questions, onVideoProgress, setIsVideoCompleted, answeredQuestions }) {
  const videoRef = useRef(null);

  useEffect(() => {
    setIsVideoCompleted(false); // Сбрасываем прогресс при смене видео
  }, [videoId, setIsVideoCompleted]);

  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const progress = (videoElement.currentTime / videoElement.duration) * 100;

    // Находим следующий вопрос, который еще не был показан
    const nextQuestion = questions.find(q => q.time <= videoElement.currentTime && !answeredQuestions[q.time]);

    if (nextQuestion) {
      onVideoProgress(nextQuestion);
      videoElement.pause();
    }

    if (progress >= 99) {
      setIsVideoCompleted(true);
    }
  };

  return (
    <video ref={videoRef} key={videoId} width="600" controls onTimeUpdate={handleVideoProgress}>
      <source src={`/videos/video${videoId}.mp4`} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
