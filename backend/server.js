const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Dasha3488001',
    database: 'restaurant_booking_app'
});

db.query('SELECT 1', (err) => {
    if (err) console.error('Помилка підключення до MySQL:', err);
    else console.log('Підключено до MySQL!');
});

app.get('/tables', (req, res) => {
    const sql = `
        SELECT table_id, table_number, capacity, location, is_occupied, pos_x, pos_y 
        FROM tables
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Помилка при отриманні столів:", err);
            return res.status(500).json({ error: "Server error" });
        }
        res.json(results);
    });
});


// Реєстрація 
app.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;
    const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, surname, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Користувач з таким email вже існує.' });
            }
            return res.status(500).json({ error: 'Помилка сервера' });
        }
        res.json({ message: 'Користувача додано успішно', userId: result.insertId });
    });
});

// Авторизація
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Помилка сервера' });
        if (results.length === 0) return res.status(401).json({ message: 'Невірний email або пароль' });
        res.json({ success: true, user: results[0] });
    });
});

// Бронювання
app.post('/book-table', (req, res) => {
    const { userId, tableId, bookingDate, startTime, endTime, guestCount } = req.body;

    if (!userId || !tableId || !bookingDate || !startTime || !endTime || !guestCount) {
        return res.status(400).json({ error: 'Будь ласка, надайте всі дані для бронювання.' });
    }

    const startDateTime = `${bookingDate} ${startTime}:00`;
    const endDateTime   = `${bookingDate} ${endTime}:00`;

    const sql = `
        INSERT INTO bookings (user_id, table_id, booking_date, start_time, end_time, guest_count)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [userId, tableId, bookingDate, startDateTime, endDateTime, guestCount], (err, result) => {
        if (err) {
            console.error("Помилка при бронюванні:", err);
            return res.status(500).json({ success: false, message: "Помилка сервера при бронюванні" });
        }
        res.json({ success: true, message: "Бронювання успішно створено", bookingId: result.insertId });
    });
});   

app.get('/my-bookings/:userId', (req, res) => {
    const { userId } = req.params;

    const sql = `
        SELECT 
            booking_id, 
            table_id, 
            booking_date, 
            start_time, 
            end_time, 
            guest_count 
        FROM bookings 
        WHERE user_id = ? 
        ORDER BY booking_date DESC, start_time DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Помилка при отриманні бронювань:", err);
            return res.status(500).json({ success: false, message: "Помилка сервера" });
        }
        res.json(results);
    });
});

app.delete('/bookings/:bookingId', (req, res) => {
    const { bookingId } = req.params;

    console.log(`---`);
    console.log(`Отримано запит на видалення бронювання з ID: ${bookingId}`);

    if (!bookingId) {
        console.log("ПОМИЛКА: ID бронювання не було надано.");
        return res.status(400).json({ success: false, message: "Не вказано ID бронювання" });
    }

    const sql = 'DELETE FROM bookings WHERE booking_id = ?';

    db.query(sql, [bookingId], (err, result) => {
        console.log("Помилка від БД:", err);
        console.log("Результат від БД:", result);
        console.log(`---`);

        if (err) {
            console.error("Помилка при скасуванні бронювання:", err);
            return res.status(500).json({ success: false, message: "Помилка сервера" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Бронювання не знайдено" });
        }
        
        res.json({ success: true, message: "Бронювання успішно скасовано" });
    });
});

app.listen(8081, () => console.log('Сервер запущено на порту 8081'));
