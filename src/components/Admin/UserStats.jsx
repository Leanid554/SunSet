import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserStats.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const UserStats = ({ users }) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [stats, setStats] = useState(null);
  const [testResults, setTestResults] = useState({});
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

      console.log("Statystyki użytkownika:", response.data);
      setStats(response.data);

      // Загружаем результаты тестов для каждого блока
      if (response.data.blockVisits) {
        const testResultsData = {};

        for (const block of response.data.blockVisits) {
          try {
            const testResponse = await axios.get(
              `${API_BASE_URL}/block-test/progress/${response.data.userId}/${block.blockId}`
            );
            testResultsData[block.blockId] = testResponse.data.passed
              ? "✅ Zdany"
              : "❌ Nie zdany";
          } catch (err) {
            console.error(`Błąd pobierania testu dla bloku ${block.blockId}:`, err);
            testResultsData[block.blockId] = "⏳ Brak danych";
          }
        }

        setTestResults(testResultsData);
      }
    } catch (err) {
      console.error("Błąd podczas pobierania statystyk:", err);
      setError("Nie udało się załadować statystyk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-stats">
      <h3>📊 Statystyka użytkowników</h3>

      {/* Wybór użytkownika */}
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

      {/* Status ładowania i błędy */}
      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Wyświetlenie statystyk */}
      {stats && (
        <div className="stats-data">
          <h4>📅 Wizyty:</h4>
          <ul>
            {stats.visits.map((visit, index) => (
              <li key={index}>
                Wejście: {new Date(visit.entryTime).toLocaleString()} | Wyjście:{" "}
                {visit.exitTime ? new Date(visit.exitTime).toLocaleString() : "Nadal w systemie"}
              </li>
            ))}
          </ul>

          <h4>📦 Bloki:</h4>
          <ul>
            {stats.blockVisits.map((block) => (
              <li key={block.blockId}>
                {block.block.title} (Wizyty: {block.count}) |{" "}
                {block.completed ? "Zdany" : "Nie zdany"} | Test:{" "}
                {testResults[block.blockId] || "⏳ Pobieranie..."}
              </li>
            ))}
          </ul>

          <h4>📚 Wykłady:</h4>
          <ul>
            {stats.lectureProgress.map((progress) => (
              <li key={progress.lectureId}>
                {progress.lecture.title} -{" "}
                {progress.passed ? "Zaliczone" : "Nie zaliczone"} (Próby: {progress.attempts})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserStats;
