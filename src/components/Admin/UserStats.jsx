import React, { useState } from "react";
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

      setStats(response.data);

      if (response.data.blockVisits) {
        const testResultsData = {};

        for (const block of response.data.blockVisits) {
          try {
            const testResponse = await axios.get(
              `${API_BASE_URL}/block-test/progress/${response.data.userId}/${block.blockId}`
            );

            testResultsData[block.blockId] = {
              passed: testResponse.data.passed ? "✅ Zdany" : "❌ Nie zdany",
              attempts: testResponse.data.attempts || 0,
            };
          } catch (err) {
            testResultsData[block.blockId] = {
              passed: "⏳ Brak danych",
              attempts: "N/A",
            };
          }
        }

        setTestResults(testResultsData);
      }
    } catch (err) {
      setError("Nie udało się załadować statystyk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-stats">
      <h3>📊 Statystyka użytkowników</h3>

      <label>
        Wybierz użytkownika:
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">-- Wybierz --</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
      </label>
      <button onClick={fetchStats}>📩 Uzyskaj statystyki</button>

      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {stats && (
        <div className="stats-data">
          <h4>📅 Wizyty:</h4>
          <ul>
            {stats.visits.map((visit, index) => (
              <li key={index}>
                Wejście: {new Date(visit.entryTime).toLocaleString()} | Wyjście:{" "}
                {visit.exitTime
                  ? new Date(visit.exitTime).toLocaleString()
                  : "Nadal w systemie"}
              </li>
            ))}
          </ul>

          <h4>📦 Bloki:</h4>
          <ul>
            {stats.blockVisits.map((block) => (
              <li key={block.blockId}>
                {block.block.title} (Wizyty: {block.count}) |{" "}
                {block.completed ? "Zdany" : "Nie zdany"}
              </li>
            ))}
          </ul>

          <h4>📝 Testy:</h4>
          <ul>
            {stats.blockTestProgress.map((test) => (
              <li key={test.blockTestId}>
                {test.blockTest.block.title} -{" "}
                {test.passed
                  ? `✅ Zdany (Próby: ${test.attempts})`
                  : `❌ Nie zdany (Próby: ${test.attempts})`}
              </li>
            ))}
          </ul>

          <h4>📚 Wykłady:</h4>
          <ul>
            {stats.lectureProgress.map((progress) => (
              <li key={progress.lectureId}>
                {progress.lecture.title} -{" "}
                {progress.passed ? "Zaliczone" : "Nie zaliczone"} (Próby:{" "}
                {progress.attempts})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserStats;
