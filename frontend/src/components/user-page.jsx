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

      const fetchBookings = async () => {
        try {
          const response = await fetch(`http://localhost:8081/my-bookings/${userId}`);
          if (!response.ok) throw new Error('Не вдалося завантажити бронювання');
          const data = await response.json();
          setBookings(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    } else {
      navigate("/user_y");
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Завантаження даних акаунта...</p>
      </div>
    );
  }

  if (!user) {
    return (
       <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">Помилка: не вдалося завантажити дані користувача.</p>
      </div>
    )
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
              <h1 className="text-xl font-semibold text-orange-900">Вас вітає Pancake!</h1>
              <p className="text-sm text-orange-700">Вітаємо, {user.first_name || 'гість'}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium shadow hover:bg-orange-600 transition"
          >
            Вийти з акаунта
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Мої бронювання</h2>
        
        {(() => {
          if (error) {
            return <p className="text-red-500">Помилка: {error}</p>;
          }

          if (bookings.length > 0) {
            return (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.booking_id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition-all hover:shadow-lg">
                    <div>
                      <p className="text-lg font-bold text-gray-800">
                        🗓️ Бронювання на {new Date(booking.booking_date).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="mt-3 text-gray-600 space-y-1 text-sm">
                        <p><strong>Час:</strong> з {new Date(booking.start_time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })} до {new Date(booking.end_time).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p><strong>Кількість гостей:</strong> {booking.guest_count}</p>
                        <p><strong>Номер столика:</strong> {booking.table_id}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right flex flex-col items-end">
                      <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        Підтверджено
                      </span>
                      <button 
                        onClick={() => handleCancelBooking(booking.booking_id)}
                        className="mt-3 px-4 py-1.5 bg-red-100 text-red-800 text-xs font-semibold rounded-lg hover:bg-red-200 hover:text-red-900 transition-colors"
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          }

          return (
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
          );
        })()}

      </main>

    </div>
  );
}