import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import videoQuestions from "../../data/videoQuestions";
import VideoPlayer from "../../components/Video/VideoPlayer";
import QuizPopup from "../../components/Video/QuizPopup";
import NavigationButtons from "../../components/Video/NavigationButtons";
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  const questions = videoQuestions[id] || [];

  const handleVideoProgress = (nextQuestion) => {
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsVideoCompleted(true);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (currentQuestion) {
      setAnsweredQuestions(prev => ({ ...prev, [currentQuestion.time]: true }));
      setCurrentQuestion(null);
    }
  };

  const handleNext = () => {
    navigate(`/video/${+id + 1}`);
  };

  return (
    <div className="video-page">
      <h3>Lekcja {id}</h3>
      <VideoPlayer videoId={id} questions={questions} onVideoProgress={handleVideoProgress} />
      
      {currentQuestion && <QuizPopup question={currentQuestion} onAnswer={handleAnswer} />}
      
      <NavigationButtons
        videoId={id}
        isVideoCompleted={isVideoCompleted}
        onNext={handleNext}
      />
    </div>
  );
}

export default VideoPage;
