const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');

/**
 * Получает список всех специальностей из базы данных
 * @returns {Promise<Array>} Промис с массивом специальностей
 * @throws {Error} Если произошла ошибка при запросе к БД
 */
async function getSpecialities() {
    // SQL-запрос для выборки всех специальностей
    const sql = `SELECT * FROM specialities`;

    return new Promise((resolve, reject) => {
        // Выполнение запроса к базе данных
        db.all(sql, function (err, rows) {
            if (err) {
                // Логирование и возврат ошибки при неудаче
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех специальностей"));
            }
            // Возвращаем полученные данные
            console.log("Вернули специальности")
            resolve(rows);
        });
    });
}

/**
 * Добавляет новую специальность в базу данных
 * @param {string} specialityName Название специальности
 * @returns {Promise<Object>} Промис с данными добавленной специальности (id и название)
 * @throws {Error} Если произошла ошибка при добавлении
 */
async function addSpeciality(specialityName) {
    // Генерация уникального ID для новой специальности
    const specialityId = generateUniqueId('speciality');
    // SQL-запрос для вставки новой записи
    const sql = 'INSERT INTO specialities (id, name) VALUES ( ?, ? )'

    return new Promise((resolve, reject) => {
        // Выполнение запроса с параметрами
        db.run(sql, [specialityId, specialityName], function (err) {
            if (err) {
                // Обработка ошибки базы данных
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления специальности'));
            }
            // Логирование успешного добавления
            console.log("Специальность добавлена:", specialityName);
            // Возвращаем данные созданной специальности
            resolve({
                specialityId: specialityId,
                specialityName: specialityName
            })
        })
    })
}

/**
 * Обновляет данные специальности
 * @param {string} id ID специальности для обновления
 * @param {string} speciality Новое название специальности
 * @returns {Promise<Object>} Промис с обновленными данными специальности
 * @throws {Error} Если специальность не найдена или произошла ошибка
 */
async function updateSpeciality(id, speciality) {
    // SQL-запрос для обновления названия специальности
    const updateSql = `UPDATE specialities SET name = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        // Используем serialize для последовательного выполнения запросов
        db.serialize(() => {
            // 1. Выполняем обновление записи
            db.run(updateSql, [speciality, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления специальности"));
                }

                // 2. После обновления получаем обновленную запись
                db.get(`SELECT * FROM specialities WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленной специальности:", err.message);
                        return reject(new Error("Ошибка при получении обновленной специальности"));
                    }
                    if (!row) {
                        return reject(new Error("Специальность не найдена после обновления"));
                    }
                    console.log("Специальность обновлена и возвращена");
                    resolve(row);
                });
            });
        });
    });
}

/**
 * Удаляет специальность по ID
 * @param {string} id ID специальности для удаления
 * @returns {Promise<string>} Промис с результатом операции ('OK' при успехе)
 * @throws {Error} Если произошла ошибка при удалении
 */
async function deleteSpeciality(id) {
    // SQL-запрос для удаления специальности
    const sql = "DELETE FROM specialities WHERE id = ?";

    return new Promise((resolve, reject) => {
        // Выполнение запроса на удаление
        db.run(sql, [id], (err) => {
            if (err) {
                // Обработка ошибки базы данных
                console.error("Ошибка базы данных:", err.message);
                reject(new Error(`Ошибка удаления специальности с id: ${id}`));
            } else {
                // Логирование успешного удаления
                console.log(`Специальность с id ${id} удалена`);
                resolve("OK");
            }
        });
    });
}

module.exports = {
    getSpecialities,
    addSpeciality,
    updateSpeciality,
    deleteSpeciality,
}