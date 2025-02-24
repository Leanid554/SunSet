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
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [lecturesVisible, setLecturesVisible] = useState(true); // Управляем видимостью списка лекций
  const [blocksVisible, setBlocksVisible] = useState(true); // Управляем видимостью списка блоков

  useEffect(() => {
    fetchUsers();
    fetchBlocks();
    fetchLectures();
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
      setLectures(lectures.filter(lecture => lecture.id !== lectureId));
      alert("Лекция успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении лекции:", error);
      alert("Ошибка при удалении лекции");
    }
  };

  const deleteBlock = async (blockId) => {
    try {
      await axios.delete(`${API_BASE_URL}/blocks/${blockId}`);
      setBlocks(blocks.filter(block => block.id !== blockId));
      alert("Блок успешно удален");
    } catch (error) {
      console.error("Ошибка при удалении блока:", error);
      alert("Ошибка при удалении блока");
    }
  };

  // Функция для нахождения названия блока по ID
  const getBlockTitle = (blockId) => {
    const block = blocks.find(block => block.id === blockId);
    return block ? block.title : "Неизвестный блок";
  };

  return (
    <div className="admin-page">
      <h2>📌 Панель Администратора</h2>
      <AddBlock blocks={blocks} setBlocks={setBlocks} />
      <AddLecture blocks={blocks} lectures={lectures} setLectures={setLectures} />
      <AddUser users={users} setUsers={setUsers} />
      <UserList users={users} />

      {/* Секция лекций */}
      <div className="admin-section">
        <h3>📚 Список всех лекций</h3>
        <button onClick={() => setLecturesVisible(!lecturesVisible)}>
          {lecturesVisible ? "Скрыть список лекций" : "Показать список лекций"}
        </button>

        {lecturesVisible && lectures.length > 0 && (
          <ul>
            {lectures.map((lecture) => (
              <li key={lecture.id}>
                <strong>Название:</strong> {lecture.title} |
                <strong> ID:</strong> {lecture.id} |
                <strong> Блок:</strong> {getBlockTitle(lecture.blockId)} (ID: {lecture.blockId}) |
                <button onClick={() => deleteLecture(lecture.id)}>Удалить лекцию</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Секция блоков */}
      <div className="admin-section">
        <h3>📦 Список всех блоков</h3>
        <button onClick={() => setBlocksVisible(!blocksVisible)}>
          {blocksVisible ? "Скрыть список блоков" : "Показать список блоков"}
        </button>

        {blocksVisible && blocks.length > 0 && (
          <ul>
            {blocks.map((block) => (
              <li key={block.id}>
                <strong>Название блока:</strong> {block.title} |
                <strong> ID:</strong> {block.id} |
                <button onClick={() => deleteBlock(block.id)}>Удалить блок</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
