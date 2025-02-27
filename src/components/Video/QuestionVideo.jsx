import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionVideo.scss";

function QuestionVideo({ lectureId, videoRef, onAnswerChange, onVideoCompleted }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

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
    if (!videoRef.current || questions.length === 0) return;

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

    const handleVideoEnd = () => {
      setIsVideoCompleted(true);
      onVideoCompleted(); // Уведомляем родителя, что видео завершено
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("timeupdate", checkTime);
    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("timeupdate", checkTime);
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, [questions, answeredQuestions, videoRef, onVideoCompleted]);

  const handleAnswer = (questionId, selectedOption) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = question.answer === selectedOption;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => new Set([...prev, questionId]));
    setActiveQuestion(null);
    if (videoRef.current) videoRef.current.play();

    // Передаем правильные ответы после их обновления
    onAnswerChange(correctAnswers + (isCorrect ? 1 : 0));  // Увеличиваем правильные ответы только если ответ правильный
  };

  return (
    <div>
      {activeQuestion && (
        <div className="question-modal">
          <div className="modal-content">
            <p><strong>Вопрос:</strong> {activeQuestion.question}</p>
            <ul className="answer-list">
              {activeQuestion.options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(activeQuestion.id, option)}>
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
