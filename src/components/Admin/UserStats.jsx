import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const UserStats = ({ users }) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    if (!selectedEmail) {
      alert("Wybierz użytkownika!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/user-stats`, {
        email: selectedEmail,
      });

      console.log("Статистика пользователя:", response.data);
      setStats(response.data);
    } catch (err) {
      console.error("Ошибка при получении статистики:", err);
      setError("Не удалось загрузить статистику.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-stats">
      <h3>📊 Statystyka użytkowników</h3>

      {/* Выбор пользователя */}
      <label>
      Wybierz użytkownika:
        <select value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
          <option value="">-- Wybierz --</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
      </label>
      <button onClick={fetchStats}>📩 Uzyskaj statystyki</button>

      {/* Статус загрузки и ошибки */}
      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Отображение статистики */}
      {stats && (
        <div className="stats-data">
          <h4>📅 Wizyty:</h4>
          <ul>
            {stats.visits.map((visit, index) => (
              <li key={index}>
                Wejście: {new Date(visit.entryTime).toLocaleString()} | Выход: {visit.exitTime ? new Date(visit.exitTime).toLocaleString() : "Nadal w systemie"}
              </li>
            ))}
          </ul>

          <h4>📦 Bloki:</h4>
          <ul>
            {stats.blockVisits.map((block) => (
              <li key={block.blockId}>
                {block.block.title} (Wizyty: {block.count})
              </li>
            ))}
          </ul>

          <h4>📚 Wykłady:</h4>
          <ul>
            {stats.lectureVisits.map((lecture) => (
              <li key={lecture.lectureId}>
                {lecture.lecture.title} (Wizyty:{lecture.count})
              </li>
            ))}
          </ul>

          <h4>✅ Progress:</h4>
          <ul>
            {stats.lectureProgress.map((progress) => (
              <li key={progress.lectureId}>
                {progress.lecture.title} - {progress.passed ? "Zaliczone" : "Nie zaliczone"} (Próby: {progress.attempts})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserStats;
