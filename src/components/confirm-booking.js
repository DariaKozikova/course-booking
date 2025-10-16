import React from "react";

export default function BookingModalUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-orange-100 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-orange-700 text-center">
          Підтвердження бронювання
        </h2>
        <p className="mt-2 text-sm text-orange-500 text-center">
          Перевірте дані перед підтвердженням
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Ваше ім'я"
            className="w-full rounded-md border border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <input
            type="number"
            min={1}
            max={20}
            placeholder="Кількість гостей"
            className="w-full rounded-md border border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <input
              type="time"
              className="rounded-md border border-orange-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-md bg-white border border-orange-200 text-orange-600 hover:bg-orange-50">
            Скасувати
          </button>

          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow hover:scale-[1.03] active:scale-95 transition-transform">
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  );
}
