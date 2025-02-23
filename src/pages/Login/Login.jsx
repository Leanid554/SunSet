import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.scss";

function Login() {
  const navigate = useNavigate(); // Хук для навигации

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: "",
  });

  const [loading, setLoading] = useState(false); // Состояние загрузки

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

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

    // Валидация
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Включаем индикатор загрузки

    try {
      const response = await axios.post(
        "https://testapp-backend-t9ez5n-13f667-217-154-81-219.traefik.me/auth/login",
        formData
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token); // Сохраняем токен

        // ✅ Даем время UI обновиться, прежде чем менять маршрут
        setTimeout(() => {
          setLoading(false);
          navigate("/main"); // Перенаправляем после завершения загрузки
        }, 500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: "Invalid email or password",
      }));
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="form-field"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading} // Блокируем ввод во время загрузки
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="form-field"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading} // Блокируем ввод во время загрузки
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>

          {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}

          <button className="submit" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
