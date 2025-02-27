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

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const updateTime = () => {
      if (videoRef.current) {
        setVideoProgress(videoRef.current.currentTime);
      }
    };

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (videoElement && isMounted.current) {
        videoElement.removeEventListener("timeupdate", updateTime);
      }
      isMounted.current = false;
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
