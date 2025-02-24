import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const AddLecture = ({ lectures, setLectures }) => {
  const [blocks, setBlocks] = useState([]); 
  const [newLecture, setNewLecture] = useState({ blockId: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocks`);
      setBlocks(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке блоков:", err);
      setError("Не удалось загрузить блоки");
    }
  };

  const addLecture = async () => {
    if (!newLecture.blockId || newLecture.title.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/lectures`, {
        title: newLecture.title,
        blockId: parseInt(newLecture.blockId),
      });

      setLectures([...lectures, response.data]); // Добавляем новую лекцию в состояние
      setNewLecture({ blockId: "", title: "" });
    } catch (err) {
      setError("Ошибка при добавлении лекции");
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h3>📖 Добавить лекцию</h3>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <select
        value={newLecture.blockId}
        onChange={(e) => setNewLecture({ ...newLecture, blockId: e.target.value })}
      >
        <option value="">Выберите блок</option>
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.title}
            </option>
          ))
        ) : (
          <option disabled>Загрузка блоков...</option>
        )}
      </select>

      <input
        type="text"
        placeholder="Название лекции"
        value={newLecture.title}
        onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
      />

      <button onClick={addLecture} disabled={loading}>
        {loading ? "Добавление..." : "➕ Добавить"}
      </button>
    </div>
  );
};

export default AddLecture;
