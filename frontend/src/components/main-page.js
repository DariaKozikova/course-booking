import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/*  Допоміжні функції та Дані*/
const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/* Столики
const ALL_TABLES = [
  { id: 1, capacity: 4, x: 50, y: 15, reserved: false, location: "hall", reservations: {} },
  { id: 2, capacity: 6, x: 25, y: 35, reserved: true, location: "hall", reservations: { [getTodayDate()]: [{ start: "19:00", end: "21:00" }] } },
  { id: 3, capacity: 6, x: 75, y: 35, reserved: false, location: "hall", reservations: {} },
  { id: 4, capacity: 8, x: 50, y: 55, reserved: false, location: "hall", reservations: {} },
  { id: 5, capacity: 6, x: 65, y: 75, reserved: true, location: "hall", reservations: {} },
  { id: 6, capacity: 6, x: 35, y: 75, reserved: false, location: "hall", reservations: {} },
  { id: 7, capacity: 4, x: 50, y: 95, reserved: false, location: "hall", reservations: {} },

  { id: 8, capacity: 4, x: 30, y: 20, reserved: false, location: "terrace", reservations: {} },
  { id: 9, capacity: 6, x: 70, y: 20, reserved: false, location: "terrace", reservations: {} },
  { id: 10, capacity: 8, x: 50, y: 50, reserved: false, location: "terrace", reservations: {} },
  { id: 11, capacity: 4, x: 30, y: 80, reserved: false, location: "terrace", reservations: {} },
  { id: 12, capacity: 6, x: 70, y: 80, reserved: false, location: "terrace", reservations: {} },
]; */

const SEATING_ARRANGEMENT = {
  2: [[0, -35], [0, 35]],
  4: [[-35, 0], [35, 0], [0, -35], [0, 35]],
  6: [[-35, 0], [35, 0], [0, -35], [0, 35], [-25, -25], [25, 25]],
  8: [[-35, 0], [35, 0], [0, -35], [0, 35], [-30, -30], [30, -30], [-30, 30], [30, 30]],
};

const getTableSizeClasses = (capacity) => {
  if (capacity >= 8) return "w-24 h-24";
  if (capacity >= 6) return "w-20 h-20";
  return "w-16 h-16";
};

const Seat = ({ position, isSelected = false, isReserved = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.25 }}
    className={`absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm border-2 ${
      isSelected
        ? "bg-orange-600 border-orange-800"
        : isReserved
        ? "bg-white border-red-400 opacity-60"
        : "bg-white border-gray-300 opacity-80"
    }`}
    style={{ left: `calc(50% + ${position[0]}%)`, top: `calc(50% + ${position[1]}%)` }}
    title="Стілець"
  />
);

const TableVisual = ({ table, isSelected = false, isAvailable = true }) => {
  const seats = SEATING_ARRANGEMENT[table.capacity] || [];
  const tableVisualClasses = getTableSizeClasses(table.capacity);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: isSelected ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
        !isAvailable ? "opacity-50" : "opacity-100"
      }`}
      style={{ left: `${table.x}%`, top: `${table.y}%` }}
      title={`Стіл ${table.id} (${table.capacity} місць)`}
    >
      <div className="relative w-36 h-36">
        {seats.map((pos, i) => (
          <Seat key={i} position={pos} isSelected={false} isReserved={!isAvailable} />
        ))}

        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${tableVisualClasses} transition-all duration-300 border-2 rounded-full bg-white shadow-lg ${
            isSelected
              ? "border-orange-500"
              : !isAvailable
              ? "border-red-500"
              : "border-gray-200"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${
              isSelected
                ? "bg-orange-700 text-white"
                : !isAvailable
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {table.id}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* Компонент модального вікна
const ReservationModalMock = ({ visible = false }) => { ... } 
*/

export default function ReservationAppMock() {
  const selectedTable = null;
  const guestCount = 4;
  const reservationDate = getTodayDate();
  const reservationStartTime = "18:00";
  const reservationEndTime = "20:00";
  const locationFilter = "hall";
  const today = getTodayDate();

  /* const tablesToRender = ALL_TABLES.filter((t) => t.location === locationFilter);
  const availableTablesCountForGuests = tablesToRender.filter((t) => !t.reserved && t.capacity >= guestCount).length; */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 border-b-4 border-orange-500 pb-2">
          Бронювання Столиків <span className="text-xl font-medium text-gray-500 ml-2">RestaurantFlow</span>
        </h1>

        <div className="lg:flex lg:space-x-8">
          {/* Бічна панель */}
          <motion.div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 lg:sticky lg:top-4 space-y-6">
              
              {/* --- 1. Оберіть Локацію --- */}
              {/*
              <section className="border-b pb-4">...</section>
              */}

              {/* --- 2. Оберіть Дату --- */}
              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">2. Оберіть Дату</h2>
                <input
                  type="date"
                  value={reservationDate}
                  disabled
                  min={today}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition shadow-inner appearance-none"
                />
              </section>

              {/* --- 3. Кількість Гостей --- */}
              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">3. Кількість Гостей</h2>
                <div className="flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
                  <button disabled className="p-2 w-10 h-10 rounded-full bg-amber-200 text-amber-700">‹</button>
                  <span className="text-4xl font-extrabold text-gray-800">{guestCount}</span>
                  <button disabled className="p-2 w-10 h-10 rounded-full bg-amber-200 text-amber-700">›</button>
                </div>
              </section>

              {/* --- 4. Час Бронювання --- */}
              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">4. Час Бронювання</h2>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Від</label>
                    <input
                      type="time"
                      value={reservationStartTime}
                      disabled
                      className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-700 transition shadow-inner appearance-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-500 mb-1">До</label>
                    <input
                      type="time"
                      value={reservationEndTime}
                      disabled
                      className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-700 transition shadow-inner appearance-none"
                    />
                  </div>
                </div>
              </section>

              {/* --- 5. Обраний Стіл --- */}
              {/*
              <section>...</section>
              */}
            </div>
          </motion.div>

          {/* Зал */}
          {/*
          <motion.div>...</motion.div>
          */}
        </div>
      </div>
    </div>
  );
}
