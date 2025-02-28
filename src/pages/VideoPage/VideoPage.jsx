import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../../components/Video/VideoPlayer";
import QuestionVideo from "../../components/Video/QuestionVideo";
import NavigationButtons from "../../components/Video/NavigationButtons";
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLectureCompleted, setIsLectureCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        setVideoProgress(videoRef.current.currentTime);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateTime);
      }
    };
  }, []);

  const handleAnswerChange = (newCorrectAnswers) => {
    setCorrectAnswers(newCorrectAnswers);
  };

  const handleVideoCompleted = () => {
    setIsVideoCompleted(true);
  };

  const handleLectureComplete = async (passed) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        setError("Ошибка: пользователь не авторизован!");
        return;
      }

      await axios.post(
        `https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/lectures/${id}/complete/${userId}`,
        { passed }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLectureCompleted(true);
      setError(null);
    } catch (error) {
      console.error("Ошибка при сохранении завершения лекции:", error);
      setError("Ошибка при сохранении завершения лекции!");
    }
  };

  return (
    <div className="video-page">
      <VideoPlayer ref={videoRef} />
      <QuestionVideo 
        lectureId={id} 
        videoRef={videoRef} 
        onAnswerChange={handleAnswerChange} 
        onVideoCompleted={handleVideoCompleted}
      />

      {isVideoCompleted && (
        correctAnswers >= 2 ? (
          <button className="complete-lecture-btn" onClick={() => handleLectureComplete(true)}>
            Zakończ Lekcję
          </button>
        ) : (
          <button className="retry-lecture-btn" onClick={() => handleLectureComplete(false)}>
            Spróbuj Ponownie
          </button>
        )
      )}

      {error && <div className="error-message">{error}</div>}

      <NavigationButtons videoId={id} onNext={() => navigate(`/video/${+id + 1}`)} />
    </div>
  );
}

export default VideoPage;
