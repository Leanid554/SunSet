import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/Video/VideoPlayer";
import QuestionVideo from "../../components/Video/QuestionVideo";
import NavigationButtons from "../../components/Video/NavigationButtons";
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoProgress, setVideoProgress] = useState(0);
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

  const handleNext = () => {
    navigate(`/video/${+id + 1}`);
  };

  return (
    <div className="video-page">
      <h3>Лекция {id}</h3>

      <VideoPlayer ref={videoRef} />
      <QuestionVideo lectureId={id} videoRef={videoRef} />

      <NavigationButtons videoId={id} onNext={handleNext} />
    </div>
  );
}

export default VideoPage;
