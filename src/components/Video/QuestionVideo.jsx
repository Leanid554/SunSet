import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionVideo.scss";

function QuestionVideo({ lectureId, videoRef }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

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
      const currentTime = videoRef.current.currentTime;
      const questionToShow = questions.find(
        (q) => Math.floor(q.timeInSeconds) === Math.floor(currentTime)
      );

      if (questionToShow && questionToShow !== activeQuestion) {
        videoRef.current.pause();
        setActiveQuestion(questionToShow);
      }
    };

    videoRef.current.addEventListener("timeupdate", checkTime);
    return () => videoRef.current.removeEventListener("timeupdate", checkTime);
  }, [questions, activeQuestion, videoRef]);

  const handleAnswer = () => {
    setActiveQuestion(null);
    videoRef.current.play();
  };

  return (
    <div>
      {activeQuestion && (
        <div className="question-modal">
          <div className="modal-content">
            <p><strong>Вопрос:</strong> {activeQuestion.question}</p>
            <ul>
              {activeQuestion.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <button onClick={handleAnswer}>Ответить</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionVideo;
