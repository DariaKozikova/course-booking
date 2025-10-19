import React from "react";

export default function RestaurantUserBookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-orange-100 p-6">
      <header className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between p-4 rounded-2xl shadow-sm bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-200 flex items-center justify-center text-2xl font-bold text-orange-800">R</div>
            <div>
              <h1 className="text-xl font-semibold text-orange-900">Name of the reastaurant</h1>
              <p className="text-sm text-orange-700">Welcome, guest</p>
            </div>
          </div>

          <div className="text-right text-orange-700">
            <p className="text-sm">Резервування</p>
            <p className="text-lg font-medium">2025-10-14</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Інформація про бронювання  */}
        <section className="md:col-span-1 bg-white rounded-2xl p-5 shadow-sm" aria-disabled="true">
          <h2 className="text-lg font-semibold mb-3 text-orange-900">Інформація про бронювання</h2>
          <div className="space-y-3 text-orange-800 text-sm">
            <p><span className="font-medium">Дата:</span> 2025-10-14</p>
            <p><span className="font-medium">Час:</span> 19:00</p>
            <p><span className="font-medium">Кількість людей:</span> 2</p>
            <p><span className="font-medium">Побажання:</span> Стіл біля вікна</p>
            <p><span className="font-medium">Номер телефону:</span> +380 (00) 000-00-00</p>
          </div>
        </section>

        {/* Підтвердження */}
        <section className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm text-center flex flex-col items-center justify-center" aria-disabled="true">
          <div className="w-20 h-20 rounded-full bg-orange-200 flex items-center justify-center text-4xl font-bold text-orange-700 mb-4">✓</div>
          <h2 className="text-2xl font-semibold text-orange-900 mb-2">Бронювання підтверджено!</h2>
          <p className="text-orange-700 text-sm max-w-md">
            Дякуємо за ваше бронювання у <span className="font-medium">Ristorante Roma</span>.<br />
            Ми чекаємо вас 14 жовтня 2025 року о 19:00. Якщо ви бажаєте змінити або скасувати бронювання — зверніться до адміністратора ресторану.
          </p>
        </section>
      </main>

    </div>
  );
}