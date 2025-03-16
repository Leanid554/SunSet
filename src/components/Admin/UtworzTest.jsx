import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const UtworzTest = ({ blocks, setSelectedBlockTestId, addTestToList }) => {
  const [blockId, setBlockId] = useState("");
  const [error, setError] = useState(null);

  const handleCreateTest = async () => {
    if (!blockId) {
      setError("Wymagany jest identyfikator bloku");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/block-test`, {
        blockId,
      });

      if (response.status === 201) {
        alert("Test został pomyślnie utworzony!");
        addTestToList(response.data);
        setSelectedBlockTestId(response.data.id);
        setBlockId("");
      } else {
        setError(`Błąd podczas tworzenia testu: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        setError(
          `Błąd podczas tworzenia testu: ${error.response.status} - ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else {
        setError(`Błąd podczas tworzenia testu: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h3>📝 Utwórz test</h3>
      <label>Wybierz blok:</label>
      <select onChange={(e) => setBlockId(e.target.value)} value={blockId}>
        <option value="">Wybierz blok</option>
        {blocks.map((block) => (
          <option key={block.id} value={block.id}>
            {block.title}
          </option>
        ))}
      </select>
      <button onClick={handleCreateTest}>Utwórz test</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UtworzTest;
