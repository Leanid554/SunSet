import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
          withCredentials: true, // Убираем передачу кук
          mode: "cors", // Включаем CORS
        }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
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
