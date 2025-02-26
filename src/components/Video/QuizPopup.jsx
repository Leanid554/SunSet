// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./QuizPopup.scss";

// const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

// function QuizPopup({ lectureId, currentTime, onAnswer }) {
//   const [questions, setQuestions] = useState([]);
//   const [activeQuestion, setActiveQuestion] = useState(null);

//   // Загружаем вопросы из бэкенда
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/questions/lecture/${lectureId}`);
//         setQuestions(response.data); // Сохраняем вопросы
//       } catch (error) {
//         console.error("Ошибка загрузки вопросов:", error);
//       }
//     };

//     fetchQuestions();
//   }, [lectureId]);

//   // Проверяем, когда показывать вопрос
//   useEffect(() => {
//     const questionToShow = questions.find(
//       (q) => Math.abs(q.timeInSeconds - currentTime) < 2 // Показываем, если разница менее 2 сек
//     );

//     if (questionToShow && questionToShow !== activeQuestion) {
//       setActiveQuestion(questionToShow);
//     }
//   }, [currentTime, questions, activeQuestion]);

//   if (!activeQuestion) return null; // Если нет активного вопроса — ничего не показываем

//   return (
//     <div className="quiz-popup">
//       <div className="popup-content">
//         <h2>{activeQuestion.question}</h2>
//         <div className="options">
//           {activeQuestion.options.map((option, idx) => (
//             <button key={idx} onClick={() => onAnswer(option)}>
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuizPopup;
