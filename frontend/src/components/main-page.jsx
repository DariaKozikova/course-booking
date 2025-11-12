import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SEATING_ARRANGEMENT = {
  2: [
    [0, -35],
    [0, 35],
  ],
  4: [
    [-35, 0],
    [35, 0],
    [0, -35],
    [0, 35],
  ],
  6: [
    [-35, 0],
    [35, 0],
    [0, -35],
    [0, 35],
    [-25, -25],
    [25, 25],
  ],
  8: [
    [-35, 0],
    [35, 0],
    [0, -35],
    [0, 35],
    [-30, -30],
    [30, -30],
    [-30, 30],
    [30, 30],
  ],
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
    style={{
      left: `calc(50% + ${position[0]}%)`,
      top: `calc(50% + ${position[1]}%)`,
    }}
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

// ==== ОСНОВНИЙ КОМПОНЕНТ ====
export default function ReservationAppMock() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // стан модалки

  const selectedTable = null;
  const guestCount = 4;
  const reservationDate = getTodayDate();
  const reservationStartTime = "18:00";
  const reservationEndTime = "20:00";
  const today = getTodayDate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      {/* Верхня панель */}
      <header className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Бронювання Столиків
          <span className="text-xl font-medium text-gray-500 ml-2">RestaurantFlow</span>
        </h1>
        <button
          onClick={() => navigate("/user")}
          className="px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
        >
          👤 Мій акаунт
        </button>
      </header>

      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="lg:flex lg:space-x-8">
          {/* Ліва панель (форма) */}
          <motion.div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 lg:sticky lg:top-4 space-y-6">
              {/* Дата */}
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

              {/* Кількість гостей */}
              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">3. Кількість Гостей</h2>
                <div className="flex items-center justify-between space-x-2 p-3 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
                  <span className="text-4xl font-extrabold text-gray-800">{guestCount}</span>
                </div>
              </section>

              {/* Час бронювання */}
              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">4. Час Бронювання</h2>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    value={reservationStartTime}
                    disabled
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-700"
                  />
                  <input
                    type="time"
                    value={reservationEndTime}
                    disabled
                    className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-700"
                  />
                </div>

                {/* Кнопка "Забронювати" */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
                  >
                    Забронювати
                  </button>
                </div>
              </section>
            </div>
          </motion.div>

          {/* ПРАВА ПАНЕЛЬ — 1000×1000 px з 20 столиками */}
          <div className="relative w-[1000px] h-[1000px] bg-gray-100 rounded-2xl border border-gray-300 shadow-inner overflow-hidden">
            <GridOfTables />
          </div>
        </div>
      </div>

      {showModal && <ModalSmall onClose={() => setShowModal(false)} />}
    </div>
  );
}

function ModalSmall({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Підтвердження</h2>
        <p className="text-gray-600 mb-6">Ви дійсно хочете забронювати цей столик?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Скасувати
          </button>
          <button
            onClick={() => {
              alert("Бронювання підтверджено!");
              onClose();
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Підтвердити
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GridOfTables() {
  const [selectedTable, setSelectedTable] = useState(null);

  const TABLE_SIZE = 70; 
  const GAP = 40; 
  const COLUMNS = 5; 
  const ROWS = 4; 

  const tables = [];
  let id = 1;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const x = col * (TABLE_SIZE + GAP);
      const y = row * (TABLE_SIZE + GAP);
      tables.push({ id: id++, x, y });
    }
  }

  return (
    <div className="absolute inset-0">
      {tables.map((table) => (
        <div
          key={table.id}
          onClick={() => setSelectedTable(table.id)}
          title={`Стіл ${table.id} (${table.x}, ${table.y})`}
          className={`absolute cursor-pointer border border-gray-500 rounded-[2px] transition-colors duration-150 ${
            selectedTable === table.id ? "bg-orange-500" : "bg-gray-300"
          }`}
          style={{
            left: `${table.x}px`,
            top: `${table.y}px`,
            width: `${TABLE_SIZE}px`,
            height: `${TABLE_SIZE}px`,
          }}
        >
          <span
            className="absolute text-[8px] text-gray-700"
            style={{
              left: `${TABLE_SIZE + 3}px`,
              top: `-2px`,
              whiteSpace: "nowrap",
            }}
          >
            ({table.x}, {table.y})
          </span>
        </div>
      ))}
    </div>
  );
}
