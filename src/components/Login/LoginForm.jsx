import React from "react";
import InputField from "./InputField"; 

const LoginForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        name="email"
        type="text"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={loading}
      />

      <InputField
        label="Hasło"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        disabled={loading}
      />

      {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}

      <button className="submit" type="submit" disabled={loading}>
        {loading ? "Ładowanie..." : "Zaloguj się"}
      </button>
    </form>
  );
};

export default LoginForm;
