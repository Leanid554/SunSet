import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Test from "../../components/Test/Test"; 
import "./TestPage.scss";

function TestPage() {
  const { id } = useParams(); // Получаем id теста из параметров
  const [currentPage, setCurrentPage] = useState(0); // Управление страницами вопросов

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="test-page">
      <h2>Test {id}</h2>
      <Test testId={id} page={currentPage} />
      <button className="next-test-button" onClick={goToNextPage}>
        Dalej
      </button>
    </div>
  );
}

export default TestPage;
