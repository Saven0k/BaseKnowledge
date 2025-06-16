const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api'); // Главный роутер
const path = require('path');
const morgan = require('morgan')
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// Статическое обслуживание загруженных изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Подключаем все роуты
app.use('/api', apiRouter); // Все пути будут начинаться с /api

// Обработка 404 (если роут не найден)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;