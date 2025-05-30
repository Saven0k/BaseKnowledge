const app = require('./app');
const https = require('https')
const db = require('../src/db/db')
const express = require('express')
const fs = require("fs")
const PORT = 5002;

const options = {
    key: fs.readFileSync('/var/www/httpd-cert/www-root/hexletkb.ru_le1.key'),
    cert: fs.readFileSync('/var/www/httpd-cert/www-root/hexletkb.ru_le1.crtca'),
};

app.use(express.static('/var/www/www-root/data/www/hexletkb.ru/frontend'));


// Запускаем HTTPS сервер
https.createServer(options, app).listen(PORT, () => {
    console.log('HTTPS сервер запущен на порту 5002');
});

app.get('/api', (req, res) => {
    res.send('API работает!');
});
/**
 * Обработка SIGINT для корректного завершения работы базы данных
 */
process.on("SIGINT", () => {
    db.close((err) => {
        if (err) {
            console.error("Ошибка при закрытии базы данных:", err.message);
        } else {
            console.log("Соединение с базой данных закрыто.");
        }
        process.exit(0);
    });
});