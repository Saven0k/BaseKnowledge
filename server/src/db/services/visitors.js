const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');


/**
 * Получает общее количество посещений студентов из базы данных.
 * Использует COUNT(*) для оптимизированного подсчета записей.
 * 
 * @returns {Promise<number>} Промис с количеством посещений
 * @throws {Error} В случае ошибки SQL-запроса
 * 
 * @example
 * const visitsCount = await getAllStudentVisits();
 * console.log(`Всего посещений: ${visitsCount}`);
 */
async function getAllStudentVisits() {
    const sql = `SELECT COUNT(*) as count FROM visitors`;

    return new Promise((resolve, reject) => {
        db.get(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех пользователей"));
            }
            resolve(rows.count);
        });
    });
}

/**
 * Добавляет новую запись о посещении студента.
 * Автоматически генерирует ID и устанавливает текущую дату.
 * 
 * @returns {Promise<Object>} Промис с объектом содержащим visitorId
 * @throws {Error} При ошибке вставки записи
 * 
 * @example
 * const { visitorId } = await addStudentVisitor();
 * console.log(`Добавлено посещение с ID: ${visitorId}`);
 */
async function addStudentVisitor() {
    const visitorId = generateUniqueId('visitor');
    const sql = `INSERT INTO visitors (id, date_visit) VALUES (?, ?)`;

    // Форматирование даты в формате DD.MM.YYYY
    const today = new Date();
    const formattedDate = [
        String(today.getDate()).padStart(2, '0'),
        String(today.getMonth() + 1).padStart(2, '0'),
        today.getFullYear()
    ].join('.');

    return new Promise((resolve, reject) => {
        db.run(sql, [visitorId, formattedDate], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка добавления посетителя"));
            }
            console.log("Visitor added")
            resolve({
                visitorId,
            });
        });
    });
}

module.exports = {
    getAllStudentVisits,
    addStudentVisitor,
}