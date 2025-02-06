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
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import reportWebVitals from "./reportWebVitals";
import VideoPage from "./pages/VideoPage/VideoPage";
import Block1Page from "./pages/BlockPage/BlockPage";
import TestPage from "./pages/TestPage/TestPage"; // Новое местоположение

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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/block/:id" element={<Block1Page />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/test/:id" element={<TestPage />} />
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
