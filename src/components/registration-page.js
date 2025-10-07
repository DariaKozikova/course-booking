import React from "react";

export default function RegistrationPage() {
  return (
    <div
      style={{
        background: "#91AC8F", 
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Andika', sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#91AC8F",
            fontStyle: "italic",
          }}
        >
          Реєстрація
        </h2>

        <input type="text" placeholder="Ім'я" style={inputStyle} />
        <input type="text" placeholder="Прізвище" style={inputStyle} />
        <input type="email" placeholder="Електронна пошта" style={inputStyle} />

        <button style={mainButton}>Зареєструватися</button>

        <div style={{ marginTop: "15px" }}>
          <button style={secondaryButton}>Увійти</button>
          <button style={secondaryButton}>Гість</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
};

const mainButton = {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#91AC8F",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "10px",
};

const secondaryButton = {
  padding: "8px 16px",
  border: "1px solid #91AC8F",
  borderRadius: "10px",
  background: "white",
  color: "#91AC8F",
  cursor: "pointer",
  margin: "5px",
};
