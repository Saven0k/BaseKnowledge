const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');


/**
 * Function for creating a user
 * @param {string} name
 * @param {string} text
 * @returns Returns a promise that resolves to true if the post was successfully updated, or false if the update failed.
 */
async function createUser(email, password, role) {
    const userId = generateUniqueId('user');
    const sql = `INSERT INTO users (id, email, password, countVisit, role) VALUES (?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.run(sql, [userId, email, password, 0, role], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка регистрации пользователя"));
            }

            console.log(`Пользователь добавлен: ${userId}, ${email}`);
            resolve({
                userId,
                message: "Пользователь успешно зарегистрирован",
            });
        });
    });
}
/**
 * // Function to display data from a table
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
async function getAllUsers() {
    const sql = `SELECT * FROM users`;

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех пользователей"));
            }
            console.log("Пользователи выведены");
            resolve(rows);
        });
    });
}
/**
 * Function to update user
 * @param {string} id
 * @param {string} email
 * @param {string} password
 * @returns Returns a promise that resolves to true if the post was successfully updated, or false if the update failed.
 */
async function updateUser(id, email, password, countVisit, role) {
    const sql = `UPDATE users SET email = ?, password = ?, countVisit = ?, role = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [email, password, countVisit, role, id], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка обновления пользователя"));
            }
            console.log("Пользователь обновлен:" , email, role);
            resolve("OK");
        });
    });
}
/**
 * Deletes a user from the database.
 * @param {string} id
 * @returns bool: True if the user was successfully deleted, False otherwise.
 */
async function deleteUser(id) {
    const sql = "DELETE FROM users WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                reject(new Error("Ошибка удаление пользователя с id: ", id));
            } else {
                console.log(`Пользователь с id ${id} удален`);
                resolve("OK");
            }
        });
    });
}
/**
 * Find a user from the database.
 * @param {string} email
 * @param {string} password
 * @returns bool: True if the user was finded/ false.
 */
async function findUser(email, password) {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    return new Promise((resolve, reject) => {
        db.get(sql, [email, password], (err, rows) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                reject(false);
            } else {
                console.log(`Пользователь был найден\n`);
                resolve(rows);
            }
        });
    });
}
/**
 * Получает общее количество посещений всех преподавателей.
 * Использует SUM для агрегации значений из всех записей.
 * COALESCE обеспечивает обработку NULL значений как 0.
 * 
 * @returns {Promise<{totalVisits: number}>} 
 *    Промис с объектом, содержащим общее количество посещений
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса
 * 
 * @example
 * const visits = await getAllTeacherVisits();
 * console.log(`Общее количество посещений: ${visits.totalVisits}`);
 */
async function getAllUsersVisits() {
    const sql = `SELECT SUM(COALESCE(countVisit, 0)) as totalVisits FROM users`;

    return new Promise((resolve, reject) => {
        db.get(sql, function (err, row) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка получения статистики посещений преподавателей"));
            }
            resolve(row);
        });
    });
}
/**
 * Получает количество посещений для конкретного преподавателя по email.
 * 
 * @param {string} email - Электронная почта преподавателя
 * @returns {Promise<{countVisit: number}>} 
 *    Промис с объектом, содержащим количество посещений
 * @throws {Error} Если преподаватель не найден или произошла ошибка запроса
 * 
 * @example
 * const visits = await getTeacherVisits('professor@university.edu');
 * console.log(`Посещения: ${visits.countVisit}`);
 */
async function getUserVisists(email) {
    const sql = `SELECT countVisit FROM users WHERE email = ?`;

    return new Promise((resolve, reject) => {
        db.get(sql, [email], function (err, row) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error(`Ошибка получения данных преподавателя ${email}`));
            }
            resolve(row);
        });
    });
}
/**
 * Обновляет счетчик посещений для преподавателя.
 * 
 * @param {string} email - Электронная почта преподавателя
 * @param {number} countVisit - Новое значение счетчика посещений
 * @returns {Promise<Object>} Промис с результатом операции
 * @throws {Error} Если обновление не удалось
 * 
 * @example
 * // Увеличить счетчик посещений на 1
 * const current = await getTeacherVisits('professor@university.edu');
 * await updateTeacherVisits('professor@university.edu', current.countVisit + 1);
 */
async function updateUserVisits(email, countVisit) {
    const sql = `UPDATE users SET countVisit = ? WHERE email = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [countVisit, email], function (err) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка обновления счетчика посещений"));
            }
            resolve({ success: true, changes: this.changes });
        });
    });
}

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    findUser,
    getAllUsersVisits,
    updateUserVisits,
    getUserVisists,
}