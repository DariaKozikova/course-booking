import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPageExist() {
  const navigate = useNavigate();
  const [focusedInput, setFocusedInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getInputClasses = (name) =>
    `w-full p-4 my-2 rounded-xl border-2 text-base outline-none transition-all duration-300 bg-gray-50 shadow-inner
      focus:ring-2 focus:ring-orange-500
      ${focusedInput === name ? 'border-orange-500' : 'border-gray-300'}`;

  const mainButtonClasses = `w-full py-4 border-none rounded-xl 
    bg-gradient-to-r from-orange-500 to-orange-700 text-white 
    text-lg font-semibold cursor-pointer mt-3 transition-all duration-300 
    shadow-lg shadow-orange-500/50 hover:shadow-xl hover:scale-[1.01] 
    flex items-center justify-center space-x-2`;

  const secondaryButtonClasses = `px-7 py-3 rounded-xl 
    border-2 font-medium transition-all duration-300 
    hover:bg-gray-50 hover:shadow-md min-w-[120px]
    border-orange-500 text-orange-600`;

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
        navigate("/main");
      } else {
        setErrorMessage(data.message || "Користувача не знайдено або пароль невірний");
      }
    } catch (error) {
      console.error("Помилка під час fetch /login:", error);
      setErrorMessage("Сталася помилка при з'єднанні з сервером");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    navigate("/about");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 font-inter"
      style={{ background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)" }}
    >
      <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/30 transform transition-all duration-300 hover:shadow-3xl">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl text-white 
              bg-gradient-to-br from-orange-500 to-orange-700 shadow-xl shadow-orange-400/50">
            🔒
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-extrabold text-gray-800 tracking-tight">
          Ви вже маєте акаунт
        </h2>
        <p className="text-gray-600 mb-8 text-base">
          Схоже, що ви вже реєструвалися раніше. Увійдіть до свого акаунта, щоб продовжити.
        </p>

        <form onSubmit={handleLogin} className="space-y-3 mb-4">
          <input
            type="email"
            placeholder="Електронна пошта"
            className={getInputClasses("email")}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className={getInputClasses("password")}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={mainButtonClasses} disabled={loading}>
            {loading ? "Завантаження..." : (<><span>→</span> Увійти</>)}
          </button>
        </form>

        {errorMessage && <p className="text-red-600 font-medium mb-4">{errorMessage}</p>}

        <div className="mt-6 text-sm text-gray-500">
          Забули пароль?{" "}
          <a href="#" className="text-orange-600 font-medium hover:underline transition-all">
            Відновити
          </a>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button onClick={() => navigate("/about")} className={secondaryButtonClasses}>
            <span className="mr-2">📝</span>
            Зареєструвати інший акаунт
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
