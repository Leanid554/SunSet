// src/pages/TestPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Test from "../../components/Test/Test"; // Компонент с тестами


function TestPage() {
  const { id } = useParams(); // Получаем id теста из URL

  return (
    <div className="test-page">
      <h2>Test {id}</h2>
      <Test testId={id} />
    </div>
  );
}

export default TestPage;
