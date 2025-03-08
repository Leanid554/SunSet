import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { store } from "./store/store";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import BlockPage from "./pages/BlockPage/BlockPage";
import TestPage from "./pages/TestPage/TestPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/Login/LoginPage";
import WebSocket from "./components/WebSocket";

function App() {
  const userId = useSelector((state) => state.user.userId);

  return (
    <>
      {userId && <WebSocket />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/block/:blockId" element={<BlockPage />} />
        <Route path="/lectures/:id/block/:blockId" element={<BlockPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/test/:blockId" element={<TestPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
