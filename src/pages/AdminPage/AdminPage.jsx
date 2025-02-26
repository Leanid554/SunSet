import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBlock from "../../components/Admin/AddBlock";
import AddLecture from "../../components/Admin/AddLecture";
import AddUser from "../../components/Admin/AddUser";
import UserList from "../../components/Admin/UserList";
import UploadVideo from "../../components/Admin/UploadVideo";
import QuestionVideo from "../../components/Admin/QuestionVideo.jsx";
import UserStats from "../../components/Admin/UserStats";
import "./index.scss";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const AdminPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [lecturesVisible, setLecturesVisible] = useState(false);
  const [blocksVisible, setBlocksVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchBlocks();
    fetchLectures();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      localStorage.setItem("users", JSON.stringify(response.data));
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
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

  const fetchLectures = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lectures`);
      setLectures(response.data);
    } catch (error) {
      console.error("Ошибка при получении лекций:", error);
    }
  };

  const deleteLecture = async (lectureId) => {
    try {
      await axios.delete(`${API_BASE_URL}/lectures/${lectureId}`);
      setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
      alert("Лекция успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении лекции:", error);
      alert("Ошибка при удалении лекции");
    }
  };

  const deleteBlock = async (blockId) => {
    try {
      await axios.delete(`${API_BASE_URL}/blocks/${blockId}`);
      setBlocks(blocks.filter((block) => block.id !== blockId));
      alert("Блок успешно удален");
    } catch (error) {
      console.error("Ошибка при удалении блока:", error);
      alert("Ошибка при удалении блока");
    }
  };

  const getBlockTitle = (blockId) => {
    const block = blocks.find((block) => block.id === blockId);
    return block ? block.title : "Неизвестный блок";
  };

  return (
    <div className="admin-page">
      <h2>📌 Панель Администратора</h2>

      {/* Добавление */}
      <div className="dodawanie-container">
        <h3>🛠 Добавление</h3>
        <AddBlock blocks={blocks} setBlocks={setBlocks} />
        <AddLecture blocks={blocks} lectures={lectures} setLectures={setLectures} />
        <AddUser users={users} setUsers={setUsers} />
      </div>

      {/* Управление */}
      <div className="zarzadzanie-container">
        <h3>⚙ Управление</h3>

        {/* Блоки */}
        <div className="admin-section">
          <h3>📦 Блоки</h3>
          <button onClick={() => setBlocksVisible(!blocksVisible)}>
            {blocksVisible ? "Скрыть" : "Показать"}
          </button>
          {blocksVisible && blocks.length > 0 && (
            <ul>
              {blocks.map((block) => (
                <li key={block.id}>
                  <strong>{block.title}</strong> (ID: {block.id})
                  <button onClick={() => deleteBlock(block.id)}>Удалить</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Лекции */}
        <div className="admin-section">
          <h3>📚 Лекции</h3>
          <button onClick={() => setLecturesVisible(!lecturesVisible)}>
            {lecturesVisible ? "Скрыть" : "Показать"}
          </button>
          {lecturesVisible && lectures.length > 0 && (
            <ul>
              {lectures.map((lecture) => (
                <li key={lecture.id}>
                  <strong>{lecture.title}</strong> (ID: {lecture.id}) | Блок: {getBlockTitle(lecture.blockId)}
                  <button onClick={() => deleteLecture(lecture.id)}>Удалить</button>
                  <UploadVideo lectureId={lecture.id} />
                  <button onClick={() => setSelectedLectureId(lecture.id)}>
                    Добавить вопросы
                  </button>
                  {selectedLectureId === lecture.id && <QuestionVideo lectureId={lecture.id} />}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Пользователи */}
        <div className="admin-section">
          <h3>👤 Пользователи</h3>
          <button onClick={() => setUsersVisible(!usersVisible)}>
            {usersVisible ? "Скрыть" : "Показать"}
          </button>
          {usersVisible && <UserList users={users} />}
        </div>

        {/* Статистика пользователей */}
        <div className="admin-section">
          <h3>📊 Статистика пользователей</h3>
          <button onClick={() => setStatsVisible(!statsVisible)}>
            {statsVisible ? "Скрыть" : "Показать"}
          </button>
          {statsVisible && <UserStats users={users} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
