import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ReservationAppMock() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [reservationDate, setReservationDate] = useState(getTodayDate());
  const [reservationStartTime, setReservationStartTime] = useState("18:00");
  const [reservationEndTime, setReservationEndTime] = useState("20:00");
  const [guestCount, setGuestCount] = useState(4);
  const [selectedTable, setSelectedTable] = useState(null);
  const [userId, setUserId] = useState(null);

  const today = getTodayDate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.user_id || user.id); 
    }
  }, []);

  const handleGuestChange = (delta) => {
    setGuestCount(prev => Math.min(10, Math.max(1, prev + delta)));
  };

  const handleBookingClick = () => {
    if (!userId) {
      alert("Будь ласка, увійдіть в акаунт, щоб забронювати столик!");
      navigate('/login');
      return;
    }
    if (!selectedTable) {
      alert("Будь ласка, оберіть стіл перед бронюванням!");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = async () => {
    setShowModal(false);

    const bookingData = {
      userId,
      tableId: selectedTable,
      bookingDate: reservationDate,
      startTime: reservationStartTime,
      endTime: reservationEndTime,
      guestCount,
    };

    try {
      const response = await fetch('http://localhost:8081/book-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Ваше бронювання підтверджено!");
        console.log("Бронювання успішно створено:", data);
      } else {
        alert(`Помилка бронювання: ${data.message || 'Невідома помилка'}`);
        console.error("Помилка бронювання:", data);
      }
    } catch (err) {
      console.error("Помилка мережі або сервера:", err);
      alert("Виникла помилка під час бронювання. Спробуйте ще раз.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      {/* Верхня панель */}
      <header className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Бронювання Столиків
          <span className="text-xl font-medium text-gray-500 ml-2">pancake</span>
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
          {/* Ліва панель */}
          <motion.div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 lg:sticky lg:top-4 space-y-6">
              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">1. Оберіть Дату</h2>
                <input type="date" value={reservationDate} min={today}
                  onChange={e => setReservationDate(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition shadow-inner"
                />
              </section>

              <section className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-3">2. Кількість Гостей</h2>
                <div className="flex items-center justify-between bg-gray-100 rounded-xl shadow-inner border border-gray-200 p-3">
                  <button onClick={() => handleGuestChange(-1)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-xl font-bold hover:bg-gray-300">−</button>
                  <span className="text-4xl font-extrabold text-gray-800">{guestCount}</span>
                  <button onClick={() => handleGuestChange(1)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-xl font-bold hover:bg-gray-300">+</button>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-700 mb-3">3. Оберіть Час Бронювання</h2>
                <div className="flex space-x-4">
                  <input type="time" value={reservationStartTime} onChange={e => setReservationStartTime(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"/>
                  <input type="time" value={reservationEndTime} onChange={e => setReservationEndTime(e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"/>
                </div>
              </section>

              <div className="pt-6 text-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={handleBookingClick} className="w-full py-4 text-lg font-semibold text-white rounded-2xl shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                  🍽️ Забронювати
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Зал з столами */}
          <div className="relative w-[1000px] h-[1000px] bg-gray-100 rounded-2xl border border-gray-300 shadow-inner overflow-hidden">
            <GridOfTables onSelect={setSelectedTable} selected={selectedTable} />
          </div>
        </div>
      </div>

      {showModal && <ModalSmall onClose={() => setShowModal(false)} onConfirm={confirmBooking} data={{date: reservationDate, start: reservationStartTime, end: reservationEndTime, guests: guestCount, table: selectedTable}} />}
    </div>
  );
}

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,"0");
  const day = String(now.getDate()).padStart(2,"0");
  return `${year}-${month}-${day}`;
};

function ModalSmall({ onClose, onConfirm, data }) {
  const { date, start, end, guests, table } = data;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={onClose}>
      <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:"spring", stiffness:200, damping:20}} onClick={e=>e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl">×</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Підтвердження бронювання</h2>
        <p className="text-gray-700 mb-5 text-lg leading-relaxed">
          Ви хочете забронювати <br />
          🗓️ <b>{date}</b> з <b>{start}</b> до <b>{end}</b> <br />
          👥 Гостей: <b>{guests}</b> <br />
          🍽️ Стіл №<b>{table}</b>
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={onClose} className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-gray-700 font-medium">Скасувати</button>
          <button onClick={onConfirm} className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold">✅ Підтвердити</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GridOfTables({ onSelect, selected }) {
  const TABLE_SIZE=70, GAP=40, COLUMNS=7, ROWS=8;
  const tables=[];
  let id=1;
  for(let row=0; row<ROWS; row++){
    for(let col=0; col<COLUMNS; col++){
      tables.push({id:id++, x:col*(TABLE_SIZE+GAP), y:row*(TABLE_SIZE+GAP)});
    }
  }
  return (
    <div className="absolute inset-0">
      {tables.map(table=>(
        <div key={table.id} onClick={()=>onSelect(table.id)} title={`Стіл ${table.id}`} className={`absolute cursor-pointer border border-gray-500 rounded-md flex items-center justify-center font-semibold text-xs ${selected===table.id?"bg-orange-500 text-white scale-110 shadow-lg":"bg-gray-300 text-gray-700"}`} style={{left:`${table.x}px`, top:`${table.y}px`, width:`${TABLE_SIZE}px`, height:`${TABLE_SIZE}px`, transition:"0.2s"}}>{table.id}</div>
      ))}
    </div>
  );
}
