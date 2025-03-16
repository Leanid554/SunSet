import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const UtworzTest = ({ blocks, setSelectedBlockTestId, addTestToList }) => {
  const [blockId, setBlockId] = useState("");
  const [error, setError] = useState(null);

  const handleCreateTest = async () => {
    if (!blockId) {
      setError("Block ID is required");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/block-test`, {
        blockId,
      });

      if (response.status === 201) {
        alert("Test created successfully!");
        addTestToList(response.data);
        setSelectedBlockTestId(response.data.id);
        setBlockId("");
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        setError(
          `Error creating test: ${error.response.status} - ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else {
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
