import React, { useRef } from "react";

function VideoPlayer({ videoId, questions, onVideoProgress }) {
  const videoRef = useRef(null);

  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const currentTime = videoElement.currentTime;

    // Фильтруем вопросы, на которые еще не отвечали
    const unansweredQuestions = questions.filter(q => !q.answered);

    const nextQuestion = unansweredQuestions.find(q => q.time <= currentTime);
    
    if (nextQuestion) {
      onVideoProgress(nextQuestion);
      videoElement.pause();
    }

    if (currentTime >= videoElement.duration - 0.5) {
      onVideoProgress(null);
    }
  };

  return (
    <video ref={videoRef} key={videoId} width="600" controls onTimeUpdate={handleVideoProgress}>
      <source src={`/videos/video${videoId}.mp4`} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
