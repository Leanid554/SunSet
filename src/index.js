import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
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
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { isAuthenticated } from "./pages/Login/TokenUtils";

function App() {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      // If authenticated, redirect to '/main'
      navigate("/main");
    } else {
      // If not authenticated, redirect to '/login'
      navigate("/login");
    }
  }, []); // Run once on initial load

  return (
    <>
      {userId && <WebSocket />}
      <Navbar />
      <Routes>
        {/* Default route: if authenticated, redirect to '/main'; if not, go to '/login' */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/main" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login page (always accessible) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes (only accessible if authenticated) */}
        <Route
          path="/main"
          element={isAuthenticated() ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/block/:blockId"
          element={isAuthenticated() ? <BlockPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/lectures/:id/block/:blockId"
          element={isAuthenticated() ? <BlockPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/video/:id"
          element={isAuthenticated() ? <VideoPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/test/:blockId"
          element={isAuthenticated() ? <TestPage /> : <Navigate to="/login" />}
        />

        {/* ProtectedRoute for Admin Panel */}
        <Route
          path="/admin"
          element={
            isAuthenticated() ? (
              <ProtectedRoute element={<AdminPage />} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect for any other unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
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
