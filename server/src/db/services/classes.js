// Подключение к базе данных и утилиты для генерации ID
const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');

// Функция для получения всех классов из базы данных
async function getClasses() {
    // SQL-запрос для выборки всех записей из таблицы classes
    const sql = `SELECT * FROM classes`;

    // Возвращаем Promise для асинхронной работы
    return new Promise((resolve, reject) => {
        // Выполняем запрос к базе данных
        db.all(sql, function (err, rows) {
            if (err) {
                // Логируем ошибку и возвращаем отклоненный Promise
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех классов"));
            }
            console.log("Вернули все классы")
            // Возвращаем полученные строки
            resolve(rows);
        });
    });
}

// Функция для добавления нового класса
async function addClass(newClassName) {
    // Генерируем уникальный ID для нового класса
    const classId = generateUniqueId('class');
    // SQL-запрос для вставки новой записи
    const sql = 'INSERT INTO classes (id, name) VALUES ( ?, ? )'

    return new Promise((resolve, reject) => {
        // Выполняем запрос с параметрами
        db.run(sql, [classId, newClassName], function (err) {
            if (err) {
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления класса'));
            }
            console.log("Класс добавлен: ", newClassName);
            // Возвращаем объект с данными добавленного класса
            resolve({
                classId,
                newClassName: newClassName,
            })
        })
    })
}

// Функция для обновления существующего класса
async function updateClass(id, className) {
    // SQL-запрос для обновления имени класса по ID
    const updateSql = `UPDATE classes SET name = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        // Используем serialize для последовательного выполнения запросов
        db.serialize(() => {
            // Сначала обновляем запись
            db.run(updateSql, [className, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления класса"));
                }
                // Затем получаем обновленную запись для проверки
                db.get(`SELECT * FROM classes WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленного класса:", err.message);
                        return reject(new Error("Ошибка при получении обновленного класса"));
                    }
                    if (!row) {
                        return reject(new Error("Класс не найден после обновления"));
                    }
                    console.log("Класс обновлен и возвращен");
                    // Возвращаем обновленные данные класса
                    resolve(row);
                });
            });
        });
    });
}

// Функция для удаления класса по ID
async function deleteClass(id) {
    // SQL-запрос для удаления записи
    const sql = "DELETE FROM classes WHERE id = ?";

    return new Promise((resolve, reject) => {
        // Выполняем запрос
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                // Потенциальная проблема: в сообщении об ошибке используется конкатенация через запятую,
                // что может привести к неожиданному выводу
                reject(new Error("Ошибка удаление класса с id: ", id));
            } else {
                console.log(`Класс с id ${id} удален`);
                // Возвращаем строку "OK" при успешном удалении
                resolve("OK");
            }
        });
    });
}

// Экспорт функций для использования в других модулях
module.exports = {
    getClasses,
    addClass,
    updateClass,
    deleteClass,
}