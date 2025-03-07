import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const UtworzTest = ({ blocks, setSelectedBlockTestId }) => {
  const [blockId, setBlockId] = useState("");
  const [error, setError] = useState(null);

  const handleCreateTest = async () => {
    if (!blockId) {
      setError("Block ID is required");
      return;
    }

    console.log("Attempting to create test with Block ID:", blockId);  // Log Block ID

    try {
      // Получаем токен авторизации (если нужно)
      const authToken = localStorage.getItem("authToken");
      console.log("Authorization Token:", authToken);  // Log auth token (make sure it's valid)

      // Отправляем запрос на создание теста
      const response = await axios.post(
        `${API_BASE_URL}/block-test`, // Эндпоинт
        { blockId }, // Отправляем только blockId
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Если требуется Bearer токен
          },
        }
      );

      console.log("Response from server:", response);  // Log the server response

      // Проверка успешности ответа
      if (response.status === 200) {
        alert("Test created successfully!");
        setSelectedBlockTestId(response.data.id); // Предполагаем, что ответ содержит ID теста
        setBlockId(""); // Очищаем выбранный блок
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating test:", error);
      
      // Add detailed error logging
      if (error.response) {
        console.error("Error response details:", error.response);
        setError(`Error creating test: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
      } else {
        console.error("Error details:", error.message);
        setError(`Error creating test: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h3>📝 Create Test</h3>
      <label>Select Block:</label>
      <select onChange={(e) => setBlockId(e.target.value)} value={blockId}>
        <option value="">Select Block</option>
        {blocks.map((block) => (
          <option key={block.id} value={block.id}>
            {block.title}
          </option>
        ))}
      </select>

      <button onClick={handleCreateTest}>Create Test</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UtworzTest;
