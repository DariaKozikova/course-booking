import React, { useState } from "react";

export default function AlreadyRegisteredPage() {
  const [focusedInput, setFocusedInput] = useState(null);

  // Функція для отримання класів динамічної межі
  const getInputClasses = (name) => {
    return `w-full p-4 my-2 rounded-xl border-2 text-base outline-none transition-all duration-300 bg-gray-50 shadow-inner
      focus:ring-2 focus:ring-orange-500
      ${focusedInput === name ? 'border-orange-500' : 'border-gray-300'}
    `;
  };

  const mainButtonClasses = `
    w-full py-4 border-none rounded-xl 
    bg-gradient-to-r from-orange-500 to-orange-700 text-white 
    text-lg font-semibold cursor-pointer mt-3 transition-all duration-300 
    shadow-lg shadow-orange-500/50 hover:shadow-xl hover:scale-[1.01] 
    flex items-center justify-center space-x-2
  `;

  const secondaryButtonClasses = `
    px-7 py-3 rounded-xl 
    border-2 font-medium transition-all duration-300 
    hover:bg-gray-50 hover:shadow-md min-w-[120px]
    border-orange-500 text-orange-600
  `;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 font-inter"
      style={{
        background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
      }}
    >
      <div
        className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center 
                   border border-white/30 transform transition-all duration-300 hover:shadow-3xl"
      >
        {/* Іконка */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl text-white 
              bg-gradient-to-br from-orange-500 to-orange-700 shadow-xl shadow-orange-400/50">
            🔒
          </div>
        </div>

        {/* Повідомлення */}
        <h2 className="mb-4 text-3xl font-extrabold text-gray-800 tracking-tight">
          Ви вже маєте акаунт
        </h2>
        <p className="text-gray-600 mb-8 text-base">
          Схоже, що ви вже реєструвалися раніше. Увійдіть до свого акаунта, щоб продовжити.
        </p>

        {/* Поля для входу */}
        <div className="space-y-3 mb-8">
          <input
            type="email"
            placeholder="Електронна пошта"
            className={getInputClasses("email")}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={getInputClasses("password")}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
          />
        </div>

        {/* Кнопка входу */}
        <button className={mainButtonClasses}>
          <span>→</span>
          Увійти
        </button>

        {/* Посилання на відновлення пароля */}
        <div className="mt-6 text-sm text-gray-500">
          Забули пароль?{" "}
          <a
            href="#"
            className="text-orange-600 font-medium hover:underline transition-all"
          >
            Відновити
          </a>
        </div>

        {/* Кнопка повернення до реєстрації */}
        <div className="mt-8">
          <button className={secondaryButtonClasses}>
            <span className="mr-2">📝</span>
            Зареєструвати інший акаунт
          </button>
        </div>
      </div>
    </div>
  );
}
