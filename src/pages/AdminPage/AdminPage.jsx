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
      console.error("Błąd podczas pobierania użytkowników:", error);
    }
  };

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocks`);
      setBlocks(response.data);
    } catch (error) {
      console.error("Błąd при odbierania bloków:", error);
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lectures`);
      setLectures(response.data);
    } catch (error) {
      console.error("Nie udało się otrzymać lekcji:", error);
    }
  };

  const deleteLecture = async (lectureId) => {
    try {
      await axios.delete(`${API_BASE_URL}/lectures/${lectureId}`);
      setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
      alert("Lekcja usunięta");
    } catch (error) {
      console.error("Błąd przy usunięciu lekcji:", error);
      alert("Błąd przy usunięciu lekcji");
    }
  };

  const deleteBlock = async (blockId) => {
    try {
      await axios.delete(`${API_BASE_URL}/blocks/${blockId}`);
      setBlocks(blocks.filter((block) => block.id !== blockId));
      alert("Blok został pomyślnie usunięty");
    } catch (error) {
      console.error("Błąd при usunięciu bloku:", error);
      alert("Błąd przy usunięciu bloku");
    }
  };

  const getBlockTitle = (blockId) => {
    const block = blocks.find((block) => block.id === blockId);
    return block ? block.title : "Неизвестny blok";
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
                  <button
                    onClick={() =>
                      setSelectedLectureId(
                        selectedLectureId === lecture.id ? null : lecture.id
                      )
                    }
                  >
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

        {/* Test management section */}
        <div className="admin-section">
          <h3>📝 Testy</h3>
          <button onClick={() => setTestManagementVisible(!testManagementVisible)}>
            {testManagementVisible ? "Ukryj testy" : "Pokaz testy"}
          </button>
          {testManagementVisible && (
            <div>
              {/* Test creation section */}
              <UtworzTest blocks={blocks} setSelectedBlockTestId={setSelectedBlockTestId} />
              {/* Add questions to the test */}
              {selectedBlockTestId && <TestQuestion blockTestId={selectedBlockTestId} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
