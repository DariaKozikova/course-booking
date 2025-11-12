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
    if (err) {
        console.error('Помилка підключення до MySQL:', err);
    } else {
        console.log('Підключено до MySQL!');
    }
});

app.post('/restaurant_booking_app', (req, res) => {
    const sql = 'INSERT INTO users (`first_name`, `last_name`, `email`, `password`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (error, result) => {
        if (error) {
            console.error('Помилка при додаванні користувача:', error);
            return res.status(500).json({ error: 'Помилка сервера' });
        }
        return res.json({ message: 'Користувача додано успішно', result });
    });
});

app.listen(8081, () => {
    console.log('Сервер запущено на порту 8081');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Помилка при вході користувача:', error);
      return res.status(500).json({ error: 'Помилка сервера' });
    }

    if (results.length > 0) {
      return res.json({ success: true, message: 'Вхід успішний', user: results[0] });
    } else {
      return res.status(401).json({ success: false, message: 'Користувача не знайдено або пароль невірний' });
    }
  });
});
