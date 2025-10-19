import React, { useState } from "react";

// Використовуємо класи Tailwind для помаранчевої палітри
// Orange-500 та Orange-700 для основного стилю

export default function RegistrationPage() {
  const [focusedInput, setFocusedInput] = useState(null);

  // Функція для отримання класів динамічної межі
  const getInputClasses = (name) => {
    return `w-full p-4 my-2 rounded-xl border-2 text-base outline-none transition-all duration-300 bg-gray-50 shadow-inner
      focus:ring-2 focus:ring-orange-500
      ${focusedInput === name ? 'border-orange-500' : 'border-gray-300'}
    `;
  };
  
  // Класи для основної кнопки
  const mainButtonClasses = `
    w-full py-4 border-none rounded-xl 
    bg-gradient-to-r from-orange-500 to-orange-700 text-white 
    text-lg font-semibold cursor-pointer mt-3 transition-all duration-300 
    shadow-lg shadow-orange-500/50 hover:shadow-xl hover:scale-[1.01] 
    flex items-center justify-center space-x-2
  `;

  // Класи для вторинних кнопок
  const secondaryButtonClasses = (isPrimary) => `
    px-7 py-3 rounded-xl 
    border-2 font-medium transition-all duration-300 
    hover:bg-gray-50 hover:shadow-md min-w-[120px]
    ${isPrimary 
      ? 'border-orange-500 text-orange-600' 
      : 'border-gray-400 text-gray-600'
    }
  `;


  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 font-inter"
      style={{
        // Помаранчевий градієнт фону (#f97316 - orange-500, #c2410c - orange-700)
        background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)", 
      }}
    >
      <div
        className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md text-center 
                   border border-white/30 transform transition-all duration-300 hover:shadow-3xl"
      >
        {/* Логотип / Іконка */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl text-white 
              bg-gradient-to-br from-orange-500 to-orange-700 shadow-xl shadow-orange-400/50">
            👤
          </div>
        </div>
        
        {/* Заголовок */}
        <h2 className="mb-8 text-3xl font-extrabold text-gray-800 tracking-tight">
          Створити акаунт
        </h2>

        {/* Форма вводу */}
        <div className="space-y-3 mb-8">
          <input 
            type="text" 
            placeholder="Ім'я" 
            className={getInputClasses("name")}
            onFocus={() => setFocusedInput("name")}
            onBlur={() => setFocusedInput(null)}
          />
          <input 
            type="text" 
            placeholder="Прізвище" 
            className={getInputClasses("surname")}
            onFocus={() => setFocusedInput("surname")}
            onBlur={() => setFocusedInput(null)}
          />
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

        {/* Головна кнопка */}
        <button className={mainButtonClasses}>
          <span>✓</span>
          Зареєструватися
        </button>

        {/* Роздільник */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              або
            </span>
          </div>
        </div>

        {/* Вторинні кнопки */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            className={secondaryButtonClasses(true)}
          >
            <span className="mr-2">→</span>
            Увійти
          </button>
          <button 
            className={secondaryButtonClasses(false)}
          >
            <span className="mr-2">👀</span>
            Продовжити як Гість
          </button>
        </div>
      </div>
    </div>
  );
}
