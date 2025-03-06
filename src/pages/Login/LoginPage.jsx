import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import LoginForm from "../../components/Login/LoginForm";
import { setUserId } from "../../store/userSlice";
import "./index.scss";

const API_URL = process.env.REACT_APP_API_URL;

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
      server: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", server: "" });
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        mode: "cors",
      });

      if (response.status === 201) {
        const { accessToken } = response.data;
        setToken(accessToken);

        const decoded = decodeToken(accessToken);
        if (decoded?.sub) {
          dispatch(setUserId(decoded.sub)); // Обновляем userId в Redux
        }

        setTimeout(() => {
          setLoading(false);
          navigate("/main");
        }, 500);
      }
    } catch (error) {
      console.error("Błąd autoryzacji:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: error.message.includes("ERR_NETWORK")
          ? "Błąd sieci. Spróbuj ponownie później."
          : error.response?.data?.message ||
            "Nieprawidłowy adres e-mail lub hasło.",
      }));
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

    const decoded = decodeToken(accessToken);
    if (decoded?.sub) {
      localStorage.setItem("userId", decoded.sub);
    }
  }
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getUserId = () => localStorage.getItem("userId");

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  return decoded && decoded.exp * 1000 > Date.now();
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Błąd dekodowania tokena:", error);
    return null;
  }
};
