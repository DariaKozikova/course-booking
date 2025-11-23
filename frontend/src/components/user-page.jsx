import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAccountPage() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      const userId = userData.user_id || userData.id;

      if (!userId) {
        setError("Не знайдено ID користувача. Спробуйте перелогінитись.");
        setLoading(false);
        return;
      }

      const fetchBookings = async () => {
        try {
          const response = await fetch(`http://localhost:8081/my-bookings/${userId}`);
          
          if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Отримані бронювання:", data); 
          setBookings(data);
        } catch (err) {
          console.error("Помилка fetch:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/");
  };
  
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Ви впевнені, що хочете скасувати це бронювання?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Не вдалося скасувати бронювання.');
      }
      setBookings(currentBookings => 
        currentBookings.filter(booking => booking.booking_id !== bookingId)
      );
      alert('Бронювання успішно скасовано!');
    } catch (err) {
      alert(`Помилка: ${err.message}`);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('uk-UA', { 
        year: 'numeric', month: 'long', day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (dateString) => {
    try {
        return new Date(dateString).toLocaleTimeString('uk-UA', { 
            hour: '2-digit', minute: '2-digit' 
        });
    } catch (e) {
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Завантаження даних акаунта...</p>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-orange-100 p-6 font-inter">
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between p-4 rounded-2xl shadow-sm bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-orange-200 flex items-center justify-center text-2xl font-bold text-orange-800">
              {user.first_name ? user.first_name.charAt(0).toUpperCase() : '👤'}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-orange-900">Особистий кабінет</h1>
              <p className="text-sm text-orange-700">Вітаємо, {user.first_name} {user.last_name}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium shadow hover:bg-orange-600 transition"
          >
            Вийти
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Мої бронювання</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">Помилка: {error}</div>}

        {!loading && bookings.length === 0 && !error ? (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">У вас ще немає бронювань</h3>
              <p className="text-gray-500 mb-6">Саме час це виправити!</p>
              <button 
                onClick={() => navigate('/main')}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow hover:bg-orange-600 transition"
              >
                Забронювати столик
              </button>
            </div>
        ) : (
            <div className="space-y-6">
            {bookings.map((booking) => (
                <div key={booking.booking_id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition-all hover:shadow-lg border border-orange-100">
                <div>
                    <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                     {formatDate(booking.booking_date)}
                    </p>
                    <div className="mt-3 text-gray-600 space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                         <strong>Час:</strong> {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                    </p>
                    <p> <strong>Гостей:</strong> {booking.guest_count}</p>
                    <p> <strong>Столик №:</strong> <span className="font-bold text-orange-600">{booking.table_number || booking.table_id}</span></p>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right flex flex-col items-end gap-3">
                    <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 border border-green-200 rounded-full">
                    Активне
                    </span>
                    <button 
                    onClick={() => handleCancelBooking(booking.booking_id)}
                    className="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors border border-red-100"
                    >
                    Скасувати
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}
      </main>
    </div>
  );
}