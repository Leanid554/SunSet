import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBlock from "../../components/Admin/AddBlock";
import AddLecture from "../../components/Admin/AddLecture";
import AddUser from "../../components/Admin/AddUser";
import UserList from "../../components/Admin/UserList";
import UploadVideo from "../../components/Admin/UploadVideo";
import QuestionVideo from "../../components/Admin/QuestionVideo.jsx";
import UserStats from "../../components/Admin/UserStats";
import UtworzTest from "../../components/Admin/UtworzTest";
import TestQuestion from "../../components/Admin/TestQuestion";
import "./index.scss";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AdminPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [lecturesVisible, setLecturesVisible] = useState(false);
  const [blocksVisible, setBlocksVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [selectedBlockTestId, setSelectedBlockTestId] = useState(null);
  const [testManagementVisible, setTestManagementVisible] = useState(false);
  const [testList, setTestList] = useState([]); // Список тестов для всех блоков

  useEffect(() => {
    fetchUsers();
    fetchBlocks();
  }, []);

  // Загружаем данные о пользователях
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  // Загружаем блоки
  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocks`);
      console.log("Загруженные блоки:", response.data); // Логируем блоки
      setBlocks(response.data);
      fetchTests(response.data); // После загрузки блоков, загружаем тесты
    } catch (error) {
      console.error("Ошибка при загрузке блоков:", error);
    }
  };

  // Загружаем тесты для каждого блока
  const fetchTests = async (blocks) => {
    try {
      const tests = [];
      for (const block of blocks) {
        try {
          // Делаем запросы для каждого блока по его ID
          const response = await axios.get(
            `${API_BASE_URL}/block-test/${block.id}`
          );
          console.log(`Тест для блока ${block.id}:`, response.data); // Логируем тесты
          if (response.data) {
            tests.push(response.data); // Добавляем тест в список
          }
        } catch (error) {
          console.error(
            `Ошибка при загрузке теста для блока ${block.id}:`,
            error
          );
          // Если возникла ошибка для конкретного блока, пропускаем этот блок
        }
      }
      setTestList(tests); // Обновляем список тестов
    } catch (error) {
      console.error("Ошибка при загрузке тестов:", error);
    }
  };

  const deleteLecture = async (lectureId) => {
    try {
      await axios.delete(`${API_BASE_URL}/lectures/${lectureId}`);
      setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
      alert("Lekcja usunięta");
    } catch (error) {
      console.error("Ошибка при удалении лекции:", error);
      alert("Ошибка при удалении лекции");
    }
  };

  const deleteBlock = async (blockId) => {
    try {
      await axios.delete(`${API_BASE_URL}/blocks/${blockId}`);
      setBlocks(blocks.filter((block) => block.id !== blockId));
      alert("Блок успешно удалён");
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
      <h2>📌 Panel Administratora</h2>

      <div className="dodawanie-container">
        <h3>🛠 Заполнение</h3>
        <AddBlock blocks={blocks} setBlocks={setBlocks} />
        <AddLecture
          blocks={blocks}
          lectures={lectures}
          setLectures={setLectures}
        />
        <AddUser users={users} setUsers={setUsers} />
      </div>

      <div className="zarzadzanie-container">
        <h3>⚙ Управление</h3>

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

        <div className="admin-section">
          <h3>📚 Лекции</h3>
          <button onClick={() => setLecturesVisible(!lecturesVisible)}>
            {lecturesVisible ? "Скрыть" : "Показать"}
          </button>
          {lecturesVisible && lectures.length > 0 && (
            <ul>
              {lectures.map((lecture) => (
                <li key={lecture.id}>
                  <button
                    onClick={() =>
                      setSelectedLectureId(
                        selectedLectureId === lecture.id ? null : lecture.id
                      )
                    }
                  >
                    {selectedLectureId === lecture.id ? "Скрыть" : "Показать"}{" "}
                    {lecture.title}
                  </button>
                  {selectedLectureId === lecture.id && (
                    <div>
                      <strong>{lecture.title}</strong> (ID: {lecture.id}) |
                      Block: {getBlockTitle(lecture.blockId)}
                      <button onClick={() => deleteLecture(lecture.id)}>
                        Удалить
                      </button>
                      <UploadVideo lectureId={lecture.id} />
                      <QuestionVideo lectureId={lecture.id} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-section">
          <h3>👤 Пользователи</h3>
          <button onClick={() => setUsersVisible(!usersVisible)}>
            {usersVisible ? "Скрыть" : "Показать"}
          </button>
          {usersVisible && <UserList users={users} />}
        </div>

        <div className="admin-section">
          <h3>📊 Статистика пользователя</h3>
          <button onClick={() => setStatsVisible(!statsVisible)}>
            {statsVisible ? "Скрыть" : "Показать"}
          </button>
          {statsVisible && <UserStats users={users} />}
        </div>

        <div className="admin-section">
          <h3>📝 Тесты</h3>
          <button
            onClick={() => setTestManagementVisible(!testManagementVisible)}
          >
            {testManagementVisible ? "Скрыть тесты" : "Показать тесты"}
          </button>
          {testManagementVisible && (
            <div>
              <UtworzTest
                blocks={blocks}
                setSelectedBlockTestId={setSelectedBlockTestId}
              />
              <div>
                <h4>Выберите тест для добавления вопросов</h4>
                <select
                  onChange={(e) => setSelectedBlockTestId(e.target.value)}
                  value={selectedBlockTestId || ""}
                >
                  <option value="">Выберите тест</option>
                  {testList.length > 0 ? (
                    testList.map((test) => (
                      <option key={test.id} value={test.id}>
                        {test.title}
                      </option>
                    ))
                  ) : (
                    <option value="">Нет доступных тестов</option>
                  )}
                </select>
              </div>
              {selectedBlockTestId && (
                <TestQuestion blockTestId={selectedBlockTestId} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
