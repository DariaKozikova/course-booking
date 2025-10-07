import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomePage from "./components/welcome-page"; // твоя WelcomePage
import RegistrationPage from "./components/registration-page"; // інша сторінка

export default function App() {
  return (
    <Router>
      {/* Навігаційне меню */}
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Welcome-page</Link>
        <Link to="/about">Register-page</Link>
      </nav>

      {/* Тут відображаються сторінки */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />  {/* твоя сторінка */}
        <Route path="/about" element={<RegistrationPage />} /> {/* інша сторінка */}
      </Routes>
    </Router>
  );
}
