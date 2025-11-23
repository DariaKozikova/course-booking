import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPageExist() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Вкажіть email та пароль");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data = {};
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (response.ok && data.success !== false) {
        if (data.user && (data.user.id || data.user.user_id)) {
          const userId = data.user.id || data.user.user_id;
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/main");
        } else {
          setErrorMessage("Помилка: сервер повернув успішний вхід, але без даних користувача.");
        }
      } else {
        setErrorMessage(data.message || "Користувача не знайдено або пароль невірний");
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Сталася помилка при з'єднанні з сервером");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/about");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-400 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md text-center">

        {/* Заголовок */}
        <h2 className="text-2xl font-bold mb-2">Ви вже маєте акаунт</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Схоже, що ви вже реєструвалися раніше. Увійдіть до свого акаунта.
        </p>

        {/* Форма */}
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Електронна пошта"
            className="w-full p-3 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-orange-600 text-white rounded-xl font-semibold"
            disabled={loading}
          >
            {loading ? "Завантаження..." : "→ Увійти"}
          </button>
        </form>

        {/* Помилка */}
        {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}

        {/* Посилання на відновлення паролю */}
        <div className="mt-4 text-sm text-gray-500">
          Забули пароль?{" "}
          <a href="#" className="text-orange-600 font-medium">
            Відновити
          </a>
        </div>

        {/* Кнопки додаткові */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/about")}
            className="px-5 py-2 border rounded-xl bg-orange-200"
          >
             Зареєструвати інший акаунт
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
