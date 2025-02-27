import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { store } from "./store/store";
import { setUserId } from "./store/userSlice";
import { incrementVisit } from "./store/visitsSlice";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import reportWebVitals from "./reportWebVitals";
import VideoPage from "./pages/VideoPage/VideoPage";
import BlockPage from "./pages/BlockPage/BlockPage";
import TestPage from "./pages/TestPage/TestPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/auth/login", // тест данные
          {
            email: "qwerty@gmail.com",
            password: "qwerty",
          }
        );

        if (response.status === 200 || response.status === 201) {
          const token = response.data.accessToken;

          localStorage.setItem("token", token);
          console.log("Токен получен и сохранен:", token);

          if (token.split(".").length !== 3) {
            console.error("Некорректный JWT-токен:", token);
            return;
          }

          try {
            const decoded = jwtDecode(token);
            if (decoded.sub) {
              dispatch(setUserId(decoded.sub));
              console.log("User ID:", decoded.sub);
            } else {
              console.warn("В токене отсутствует userId:", decoded);
            }
          } catch (error) {
            console.error("Ошибка при декодировании токена:", error);
          }
        } else {
          console.error(
            "Ошибка при получении токена. Статус:",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Ошибка при получении токена с сервера:",
          error.response || error.message
        );
      }
    };

    fetchToken();
  }, [dispatch]);

  return (
    <>
      <Navbar
        count={useSelector((state) => state.visits.count)}
        userId={userId}
      />
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
