/**
 * Модуль для работы с группами университета в базе данных
 * Предоставляет CRUD-операции для управления группами
 */
const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');

/**
 * Получает список всех групп университета из базы данных
 * @returns {Promise<Array>} Промис с массивом групп университета
 * @throws {Error} Если произошла ошибка при запросе к базе данных
 */
async function getUniversityGroups() {
    // SQL-запрос для выборки всех записей из таблицы групп
    const sql = `SELECT * FROM universityGroups`;

    // Оборачиваем операцию в Promise для асинхронной работы
    return new Promise((resolve, reject) => {
        // Выполняем запрос к базе данных
        db.all(sql, function (err, rows) {
            if (err) {
                // Логируем ошибку и прерываем выполнение
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех групп университета"));
            }
            // Логируем успешное выполнение
            console.log("Вывели группы университета")
            // Возвращаем полученные данные
            resolve(rows);
        });
    });
}

/**
 * Добавляет новую группу университета в базу данных
 * @param {string} universityGroupName Название группы университета
 * @returns {Promise<Object>} Промис с данными добавленной группы (id и название)
 * @throws {Error} Если произошла ошибка при добавлении
 */
async function addUniversityGroup(universityGroupName) {
    // Генерируем уникальный идентификатор для новой группы
    const groupId = generateUniqueId('collegeGroup');
    // SQL-запрос для вставки новой записи
    const sql = 'INSERT INTO universityGroups (id, name) VALUES ( ?, ? )'

    return new Promise((resolve, reject) => {
        // Выполняем запрос с параметрами
        db.run(sql, [groupId, universityGroupName], function (err) {
            if (err) {
                // Логируем ошибку базы данных
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления группы для университета'));
            }
            // Логируем успешное добавление
            console.log("Группа для университет добавлена", universityGroupName);
            // Возвращаем данные созданной группы
            resolve({
                groupId,
                universityGroupName: universityGroupName,
            })
        })
    })
}

/**
 * Обновляет данные группы университета
 * @param {string} id Идентификатор группы для обновления
 * @param {string} universityGroupName Новое название группы
 * @returns {Promise<Object>} Промис с обновленными данными группы
 * @throws {Error} Если группа не найдена или произошла ошибка
 */
async function updateUniversityGroup(id, universityGroupName) {
    // SQL-запрос для обновления названия группы
    const updateSql = `UPDATE universityGroups SET name = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        // Используем serialize для последовательного выполнения запросов
        db.serialize(() => {
            // Сначала выполняем обновление
            db.run(updateSql, [universityGroupName, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления группы университета"));
                }

                // Затем проверяем результат обновления
                db.get(`SELECT * FROM universityGroups WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленной группы:", err.message);
                        return reject(new Error("Ошибка при получении обновленной группы"));
                    }
                    if (!row) {
                        return reject(new Error("Группа университета не найдена после обновления"));
                    }
                    console.log("Группа университета обновлена и возвращена");
                    resolve(row);
                });
            });
        });
    });
}

/**
 * Удаляет группу университета по идентификатору
 * @param {string} id Идентификатор группы для удаления
 * @returns {Promise<string>} Промис с результатом операции ('OK' при успехе)
 * @throws {Error} Если произошла ошибка при удалении
 */
async function deleteUniversityGroup(id) {
    // SQL-запрос для удаления записи
    const sql = "DELETE FROM universityGroups WHERE id = ?";

    return new Promise((resolve, reject) => {
        // Выполняем запрос на удаление
        db.run(sql, [id], (err) => {
            if (err) {
                // Логируем ошибку базы данных
                console.error("Ошибка базы данных:", err.message);
                reject(new Error("Ошибка удаления группы университета с id: " + id));
            } else {
                // Логируем успешное удаление
                console.log(`Группа университета с id ${id} удалена`);
                resolve("OK");
            }
        });
    });
}

// Экспортируем функции для использования в других модулях
module.exports = {
    addUniversityGroup,
    getUniversityGroups,
    updateUniversityGroup,
    deleteUniversityGroup,
}