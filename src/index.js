import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { store } from "./store/store";
import { incrementVisit } from "./store/visitsSlice";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import reportWebVitals from "./reportWebVitals";
import VideoPage from "./pages/VideoPage/VideoPage";
import BlockPage from "./pages/BlockPage/BlockPage";
import TestPage from "./pages/TestPage/TestPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/Login/LoginPage";
import VideoPlayer from "./components/Video/VideoPlayer";

function App() {
  const visits = useSelector((state) => state.visits.count);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incrementVisit());
  }, [dispatch]);

  return (
    <>
      <Navbar count={visits} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/block/:blockId" element={<BlockPage />} />
        <Route path="/lectures/:id/block/:blockId" element={<BlockPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
        <Route path="/video/:id" component={<VideoPlayer />} />
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

reportWebVitals();
