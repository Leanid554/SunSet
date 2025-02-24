import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBlock from "../../components/Admin/AddBlock";
import AddLecture from "../../components/Admin/AddLecture";
import AddUser from "../../components/Admin/AddUser";
import UserList from "../../components/Admin/UserList";
import "./index.scss";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const AdminPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [loadingStats, setLoadingStats] = useState(false);
  const [errorStats, setErrorStats] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchBlocks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocks`);
      setBlocks(response.data);
    } catch (error) {
      console.error("Ошибка при получении блоков:", error);
    }
  };

  const fetchUserStats = async () => {
    if (!selectedUserEmail) return;

    setLoadingStats(true);
    setErrorStats(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/user-stats`, {
        email: selectedUserEmail,
      });
      setUserStats(response.data);
    } catch (error) {
      setErrorStats("Ошибка при получении статистики пользователя");
      console.error("Ошибка:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <div className="admin-page">
      <h2>📌 Панель Администратора</h2>
      <AddBlock blocks={blocks} setBlocks={setBlocks} />
      <AddLecture blocks={blocks} lectures={lectures} setLectures={setLectures} />
      <AddUser users={users} setUsers={setUsers} />
      <UserList users={users} />

      {/* Блок статистики пользователя */}
      <div className="admin-section">
        <h3>📊 Статистика пользователя</h3>
        <select
          value={selectedUserEmail}
          onChange={(e) => setSelectedUserEmail(e.target.value)}
        >
          <option value="">Выберите пользователя</option>
          {users.map((user) => (
            <option key={user.id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>
        <button onClick={fetchUserStats} disabled={loadingStats}>
          {loadingStats ? "Загрузка..." : "📈 Показать статистику"}
        </button>

        {errorStats && <p style={{ color: "red" }}>{errorStats}</p>}

        {userStats && (
          <div className="user-stats">
            <h4>📌 Данные по {selectedUserEmail}</h4>
            <pre>{JSON.stringify(userStats, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
