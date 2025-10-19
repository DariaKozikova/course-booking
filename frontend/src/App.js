import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomePage from "./components/welcome-page"; 
import RegistrationPage from "./components/registration-page"; 
import MainPage from "./components/main-page";  
import UserPage from "./components/user-page"; 
import ConfirmPage from "./components/confirm-booking";
import UserPageExist from "./components/user-page_yes";


export default function App() {
  return (
    <Router>
      {/* Навігаційне меню */}
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Welcome-page</Link>
        <Link to="/about" style={{ marginRight: "10px" }}>Register-page</Link>
        <Link to="/main">Main-page</Link>   
        <Link to="/user"> User-page</Link>   
        <Link to="/confirm"> Confirm-booking-page</Link>
        <Link to="/user_y"> User-page-yes </Link>
      </nav>

      {/* Тут відображаються сторінки */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />  
        <Route path="/about" element={<RegistrationPage />} /> 
        <Route path="/main" element={<MainPage />} />  
        <Route path="/user" element={< UserPage />} />   
        <Route path="/confirm" element={<ConfirmPage />} />  
        <Route path="/user_y" element={<UserPageExist />} />   
      </Routes>
    </Router>
  );
}
