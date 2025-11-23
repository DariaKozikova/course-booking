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

  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Реєстрація успішна!");
        navigate("/user_y");
      } else {
        setErrorMessage(data.error || "Помилка реєстрації");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Сервер недоступний");
    }
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/user_y");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-400 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-6">Створити акаунт</h2>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            className="w-full p-3 border rounded-xl"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            name="surname"
            placeholder="Прізвище"
            className="w-full p-3 border rounded-xl"
            value={formValues.surname}
            onChange={handleInputChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            className="w-full p-3 border rounded-xl"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="w-full p-3 border rounded-xl"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-orange-600 text-white rounded-xl font-semibold"
          >
            Зареєструватися
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-600 mt-3">{errorMessage}</p>
        )}

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => navigate("/user_y")}
            className="px-5 py-2 border rounded-xl bg-orange-200"
          >
            Увійти
          </button>

          <button
            onClick={logout}
            className="px-5 py-2 border rounded-xl bg-red-200 text-red-700"
          >
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
}
