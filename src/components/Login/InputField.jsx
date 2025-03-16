import React from "react";

const InputField = ({ label, name, type, value, onChange, error, disabled }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        className="form-field"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InputField;
