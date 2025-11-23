import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationApp() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [reservationDate, setReservationDate] = useState(getTodayDate());
  const [reservationStartTime, setReservationStartTime] = useState("18:00");
  const [reservationEndTime, setReservationEndTime] = useState("20:00");
  const [guestCount, setGuestCount] = useState(2);
  
  const [selectedTable, setSelectedTable] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dbTables, setDbTables] = useState([]); 
  
  const [occupiedTableIds, setOccupiedTableIds] = useState([]);

  const today = getTodayDate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.user_id || user.id); 
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8081/tables')
      .then(res => res.json())
      .then(data => setDbTables(data))
      .catch(err => console.error("Помилка отримання столиків:", err));
  }, []);

  useEffect(() => {
    if (reservationDate && reservationStartTime && reservationEndTime) {
      fetch(`http://localhost:8081/bookings/occupied?date=${reservationDate}&startTime=${reservationStartTime}&endTime=${reservationEndTime}`)
        .then(res => res.json())
        .then(data => {
            console.log("Зайняті столи:", data);
            setOccupiedTableIds(data);
            if (selectedTable && data.includes(selectedTable)) {
                setSelectedTable(null);
            }
        })
        .catch(err => console.error("Помилка перевірки зайнятості:", err));
    }
  }, [reservationDate, reservationStartTime, reservationEndTime, selectedTable]);

  const handleGuestChange = (delta) => {
    const newCount = Math.min(10, Math.max(1, guestCount + delta));
    setGuestCount(newCount);
    const table = dbTables.find(t => t.table_id === selectedTable);
    if (table && table.capacity < newCount) {
        setSelectedTable(null);
    }
  };

  const handleBookingClick = () => {
    if (!userId) {
      alert("Будь ласка, увійдіть в акаунт, щоб здійснити бронювання!");
      navigate('/login');
      return;
    }
    if (!selectedTable) {
      alert("Будь ласка, оберіть столик на схемі залу!");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = async () => {
    if (occupiedTableIds.includes(selectedTable)) {
        alert("На жаль, хтось встиг забронювати цей стіл раніше. Оберіть інший.");
        setShowModal(false);
        return;
    }

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
        alert(`Успішно! Стіл №${selectedTable} заброньовано.`);
        setSelectedTable(null);
        setOccupiedTableIds([...occupiedTableIds, selectedTable]);
      } else {
        alert(`Помилка бронювання: ${data.message || 'Щось пішло не так'}`);
      }
    } catch (err) {
      console.error("Помилка сервера:", err);
      alert("Не вдалося з'єднатися з сервером.");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800 pb-10">
      <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Pancake <span className="text-orange-500">Booking</span></h1>
            <button onClick={() => navigate("/user")} className="px-5 py-2 bg-orange-100 text-orange-600 rounded-full font-semibold">Мій кабінет</button>
          </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="lg:flex lg:gap-8">
          
          <div className="lg:w-1/3 mb-8 lg:mb-0">
             <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Деталі бронювання</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Дата</label>
                    <input type="date" value={reservationDate} min={today} onChange={e => setReservationDate(e.target.value)} className="w-full p-2 border rounded-lg"/>
                </div>
                <div className="flex gap-2 mb-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-semibold mb-1">Початок</label>
                        <input type="time" value={reservationStartTime} onChange={e => setReservationStartTime(e.target.value)} className="w-full p-2 border rounded-lg"/>
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-semibold mb-1">Кінець</label>
                        <input type="time" value={reservationEndTime} onChange={e => setReservationEndTime(e.target.value)} className="w-full p-2 border rounded-lg"/>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-600 mb-2"> Кількість гостей</label>
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <button onClick={() => handleGuestChange(-1)} className="w-10 h-10 bg-white font-bold text-orange-500 shadow rounded">-</button>
                    <span className="text-2xl font-bold text-gray-800">{guestCount}</span>
                    <button onClick={() => handleGuestChange(1)} className="w-10 h-10 bg-white font-bold text-orange-500 shadow rounded">+</button>
                    </div>
                </div>

                <button onClick={handleBookingClick} className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition">
                    Забронювати стіл
                </button>
             </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
              <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
                 <h3 className="font-bold text-gray-700">Схема залу</h3>
                 <div className="flex gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-white border border-gray-400"></span> Вільно</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Обрано</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-200"></span> Зайнято</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300"></span> Замалий</div>
                 </div>
              </div>
              
              <div className="overflow-auto rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 relative h-[600px]">
                 <InteractiveMap 
                    tables={dbTables} 
                    selectedId={selectedTable} 
                    onSelect={setSelectedTable}
                    guestCount={guestCount}
                    occupiedIds={occupiedTableIds}
                 />
              </div>
            </div>
          </div>

        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
             <div className="bg-white p-6 rounded-2xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Підтвердження</h3>
                <p className="mb-6">Бронюємо стіл №{selectedTable} для {guestCount} осіб?</p>
                <div className="flex gap-4">
                    <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-gray-200 rounded-lg">Скасувати</button>
                    <button onClick={confirmBooking} className="flex-1 py-2 bg-orange-500 text-white rounded-lg">Так</button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
}

const getTodayDate = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth()+1).padStart(2,"0");
  const d = String(now.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
};

function InteractiveMap({ tables, selectedId, onSelect, guestCount, occupiedIds }) {
  if (!tables || tables.length === 0) {
    return <div className="flex h-full items-center justify-center text-gray-400">Завантаження схеми...</div>;
  }

  return (
    <div className="relative w-[1000px] h-[1000px]">
      {tables.map((table) => {
        const isSelected = selectedId === table.table_id;
        
        const isOccupied = occupiedIds.includes(table.table_id);
        const isTooSmall = table.capacity < guestCount;
        const isDisabled = isOccupied || isTooSmall;

        const x = table.pos_x || 0;
        const y = table.pos_y || 0;
        const w = table.width || 80;
        const h = table.height || 80;
        
        let bgClass = "bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:shadow-md"; // Доступний
        if (isSelected) bgClass = "bg-orange-500 text-white border-orange-600 shadow-lg scale-105 z-10";
        else if (isOccupied) bgClass = "bg-red-100 border-red-200 text-red-300 cursor-not-allowed"; // Зайнятий
        else if (isTooSmall) bgClass = "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed opacity-60"; // Замалий

        return (
          <div
            key={table.table_id}
            onClick={() => {
                if (isOccupied) alert("Цей столик вже заброньовано на обраний час.");
                else if (isTooSmall) alert(`Цей столик розрахований максимум на ${table.capacity} осіб. Будь ласка, оберіть більший стіл.`);
                else onSelect(table.table_id);
            }}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${w}px`,
              height: `${h}px`,
            }}
            className={`
              absolute flex items-center justify-center rounded-xl font-bold text-sm shadow-sm transition-all duration-200 border-2
              ${bgClass}
            `}
            title={`Стіл №${table.table_number} (${table.capacity} місць)`}
          >
            <div className="flex flex-col items-center leading-none pointer-events-none select-none">
                <span>{table.table_number}</span>
                {h > 50 && w > 50 && (
                     <span className="text-[10px] font-normal mt-1 opacity-80">
                        {isOccupied ? "🔒" : `👤${table.capacity}`}
                     </span>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}