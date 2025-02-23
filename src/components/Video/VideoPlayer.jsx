import React, { useRef } from "react";

function VideoPlayer({ videoId, questions, onVideoProgress }) {
  const videoRef = useRef(null);

  const handleVideoProgress = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const currentTime = videoElement.currentTime;
    const nextQuestion = questions.find(q => q.time <= currentTime && !q.answered);

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
