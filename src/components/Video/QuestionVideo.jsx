import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionVideo.scss";

function QuestionVideo({ lectureId, videoRef }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Ошибка: Токен отсутствует");
          return;
        }

        const response = await axios.get(
          `https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/questions/lecture/${lectureId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setQuestions(response.data);
      } catch (err) {
        console.error("Ошибка загрузки вопросов:", err);
      }
    };

    fetchQuestions();
  }, [lectureId]);

  useEffect(() => {
    if (!videoRef.current) return;

    const checkTime = () => {
      const currentTime = Math.floor(videoRef.current.currentTime);

      const questionToShow = questions.find(
        (q) => q.timeInSeconds === currentTime && !answeredQuestions.has(q.id)
      );

      if (questionToShow) {
        videoRef.current.pause();
        setActiveQuestion(questionToShow);
      }
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("timeupdate", checkTime);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", checkTime);
      }
    };
  }, [questions, answeredQuestions, videoRef]);

  const handleAnswer = (questionId) => {
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
    setActiveQuestion(null);
    videoRef.current.play();
  };

  return (
    <div>
      {activeQuestion && (
        <div className="question-modal">
          <div className="modal-content">
            <p><strong>Вопрос:</strong> {activeQuestion.question}</p>
            <ul className="answer-list">
              {activeQuestion.options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(activeQuestion.id)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionVideo;
