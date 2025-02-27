import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import LoginForm from "../../components/Login/LoginForm";
import "./index.scss";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors({
      ...errors,
      [name]: "",
      server: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", server: "" });
    setLoading(true);

    try {
      const response = await axios.post(
        "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          mode: "cors",
        }
      );

      if (response.status === 201) {
        const { accessToken } = response.data;

        setToken(accessToken);
        console.log("Decoded Token:", decodeToken(accessToken));

        setTimeout(() => {
          setLoading(false);
          navigate("/main");
        }, 500);
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);

      if (error.message.includes("ERR_NETWORK")) {
        setErrors({
          ...errors,
          server: "Ошибка сети. Попробуйте позже.",
        });
      } else {
        setErrors({
          ...errors,
          server: error.response?.data?.message || "Неверный email или пароль.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form">
        <LoginForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default LoginPage;

// Функции для работы с токенами
export const setToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);

    // Расшифровка токена и сохранение userId
    const decoded = decodeToken(accessToken);
    if (decoded && decoded.sub) {
      localStorage.setItem("userId", decoded.sub);
    }
  }
};

// Получение access-токена
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Получение userId
export const getUserId = () => {
  return localStorage.getItem("userId");
};

// Удаление токенов и userId
export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
};

// Проверка аутентификации
export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  return decoded && decoded.exp * 1000 > Date.now();
};

// Функция расшифровки токена
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
};