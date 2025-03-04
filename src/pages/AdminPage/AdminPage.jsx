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
      console.error("Błąd podczas pobierania użytkowników:", error);
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
      console.error("Błąd podczas odbierania bloków:", error);
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lectures`);
      setLectures(response.data);
    } catch (error) {
      console.error("Nie udalo sie otrzymac lekcje:", error);
    }
  };

  const deleteLecture = async (lectureId) => {
    try {
      await axios.delete(`${API_BASE_URL}/lectures/${lectureId}`);
      setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
      alert("Lekcja usunieta");
    } catch (error) {
      console.error("Blad przy usuniensciu Lekcji:", error);
      alert("Blad przy usuniensciu Lekcji");
    }
  };

  const deleteBlock = async (blockId) => {
    try {
      await axios.delete(`${API_BASE_URL}/blocks/${blockId}`);
      setBlocks(blocks.filter((block) => block.id !== blockId));
      alert("Blok zostało pomyślnie usunięte");
    } catch (error) {
      console.error("Blad przy usuniensciu bloku:", error);
      alert("Blad przy usuniensciu bloku");
    }
  };

  const getBlockTitle = (blockId) => {
    const block = blocks.find((block) => block.id === blockId);
    return block ? block.title : "Неизвестный блок";
  };

  return (
    <div className="admin-page">
      <h2>📌 Panel administratora</h2>

      <div className="dodawanie-container">
        <h3>🛠 Uzupełnienie</h3>
        <AddBlock blocks={blocks} setBlocks={setBlocks} />
        <AddLecture blocks={blocks} lectures={lectures} setLectures={setLectures} />
        <AddUser users={users} setUsers={setUsers} />
      </div>

      <div className="zarzadzanie-container">
        <h3>⚙ Zarządzanie</h3>

        <div className="admin-section">
          <h3>📦 Bloki</h3>
          <button onClick={() => setBlocksVisible(!blocksVisible)}>
            {blocksVisible ? "Ukryj" : "Pokaz"}
          </button>
          {blocksVisible && blocks.length > 0 && (
            <ul>
              {blocks.map((block) => (
                <li key={block.id}>
                  <strong>{block.title}</strong> (ID: {block.id})
                  <button onClick={() => deleteBlock(block.id)}>Usuń</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-section">
          <h3>📚 Wykłady</h3>
          <button onClick={() => setLecturesVisible(!lecturesVisible)}>
            {lecturesVisible ? "Ukryj" : "Pokaz"}
          </button>
          {lecturesVisible && lectures.length > 0 && (
            <ul>
              {lectures.map((lecture) => (
                <li key={lecture.id}>
                  <button onClick={() => setSelectedLectureId(selectedLectureId === lecture.id ? null : lecture.id)}>
                    {selectedLectureId === lecture.id ? "Ukryj" : "Pokaz"} {lecture.title}
                  </button>
                  {selectedLectureId === lecture.id && (
                    <div>
                      <strong>{lecture.title}</strong> (ID: {lecture.id}) | Block: {getBlockTitle(lecture.blockId)}
                      <button onClick={() => deleteLecture(lecture.id)}>Usuń</button>
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
          <h3>👤 Użytkowniki</h3>
          <button onClick={() => setUsersVisible(!usersVisible)}>
            {usersVisible ? "Ukryj" : "Pokaz"}
          </button>
          {usersVisible && <UserList users={users} />}
        </div>

        <div className="admin-section">
          <h3>📊 Statystyki użytkownika</h3>
          <button onClick={() => setStatsVisible(!statsVisible)}>
            {statsVisible ? "Ukryj" : "Pokaz"}
          </button>
          {statsVisible && <UserStats users={users} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;