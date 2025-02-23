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
        "https://testapp-backend-t9ez5n-13f667-217-154-81-219.traefik.me/auth/login",
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); 
        setTimeout(() => {
          setLoading(false);
          navigate("/main"); 
        }, 500);
      }
    } catch (error) {
      setErrors({
        ...errors,
        server: "Invalid email or password",
      });
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
