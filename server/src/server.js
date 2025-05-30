const app = require('./app');
const db = require('../src/db/db')
const PORT = 5000;

/**
 * Запуск сервера
 */
const server = app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
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