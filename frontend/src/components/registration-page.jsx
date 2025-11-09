import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  }

  function getInputClasses(inputName) {
    return `
      w-full p-4 my-2 rounded-xl border-2 text-base outline-none transition-all duration-300 bg-gray-50 shadow-inner
      focus:ring-2 focus:ring-orange-500
      ${focusedInput === inputName ? "border-orange-500" : "border-gray-300"}
    `;
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8081/restaurant_booking_app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();

      if (response.ok) {
        setFormValues({ name: "", surname: "", email: "", password: "" });
        navigate("/main");
      } else {
        setErrorMessage(data.error || "Виникла помилка при додаванні користувача");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Сервер недоступний. Будь ласка, спробуйте пізніше.");
    }
  }

  const logout = () => {
    navigate("/user_y");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 font-inter"
      style={{ background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)" }}
    >
      <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/30">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl text-white 
            bg-gradient-to-br from-orange-500 to-orange-700 shadow-xl shadow-orange-400/50">
            👤
          </div>
        </div>

        <h2 className="mb-8 text-3xl font-extrabold text-gray-800 tracking-tight">
          Створити акаунт
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-3 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formValues.name}
            onChange={handleInputChange}
            className={getInputClasses("name")}
            onFocus={() => setFocusedInput("name")}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Прізвище"
            value={formValues.surname}
            onChange={handleInputChange}
            className={getInputClasses("surname")}
            onFocus={() => setFocusedInput("surname")}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formValues.email}
            onChange={handleInputChange}
            className={getInputClasses("email")}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formValues.password}
            onChange={handleInputChange}
            className={getInputClasses("password")}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            required
          />

          <button
            type="submit"
            className="w-full py-4 border-none rounded-xl 
                       bg-gradient-to-r from-orange-500 to-orange-700 text-white 
                       text-lg font-semibold cursor-pointer mt-3 transition-all duration-300 
                       shadow-lg shadow-orange-500/50 hover:shadow-xl hover:scale-[1.01] 
                       flex items-center justify-center space-x-2"
          >
            <span>✓</span> Зареєструватися
          </button>
        </form>

        {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => navigate("/user_y")}
            className="px-7 py-3 rounded-xl border-2 font-medium transition-all duration-300 
                       hover:bg-gray-50 hover:shadow-md min-w-[120px] border-orange-500 text-orange-600"
          >
            <span className="mr-2">→</span> Увійти
          </button>

          <button
            onClick={logout}
            className="px-7 py-3 rounded-xl border-2 border-red-500 text-red-600 font-medium 
                       transition-all duration-300 hover:bg-red-50 hover:shadow-md"
          >
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
}
