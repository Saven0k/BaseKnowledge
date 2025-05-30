const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');

/**
 * Асинхронно получает все роли из базы данных.
 * @returns {Promise<Array>} Промис, который разрешается массивом объектов ролей
 * @throws {Error} Если произошла ошибка при запросе к базе данных
 */
async function getRoles() {
    const sql = `SELECT * FROM roles`;

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех ролей"));
            }
            resolve(rows);
        });
    });
}



/**
 * Добавляет новую роль в базу данных.
 * @param {string} role - Название новой роли
 * @returns {Promise<Object>} Промис, который разрешается объектом с ID созданной роли
 * @throws {Error} Если произошла ошибка при добавлении роли
 */
async function addRole(role) {
    const roleId = generateUniqueId('role');
    const sql = 'INSERT INTO roles (id, name) VALUES ( ?, ? )'
    return new Promise((resolve, reject) => {
        db.run(sql, [roleId, role], function (err) {
            if (err) {
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления роли'));
            }
            console.log("Role added:", role);
            resolve({
                roleId: roleId,
            })
        })
    })
}

/**
 * Обновляет существующую роль в базе данных.
 * @param {string} id - ID роли для обновления
 * @param {string} role - Новое название роли
 * @returns {Promise<Object>} Промис, который разрешается обновленным объектом роли
 * @throws {Error} Если произошла ошибка при обновлении или роль не найдена
 */
async function updateRole(id, role) {
    const updateSql = `UPDATE roles SET name = ? WHERE id = ?`;

    // Обновляем пост и затем получаем обновленные данные
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Выполняем обновление
            db.run(updateSql, [role, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления роли"));
                }

                // После успешного обновления получаем обновленный пост
                db.get(`SELECT * FROM roles WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленной роли:", err.message);
                        return reject(new Error("Ошибка при получении обновленной роли"));
                    }
                    if (!row) {
                        return reject(new Error("Роль не найдена после обновления"));
                    }
                    console.log("Роль обновлена и возвращена");
                    resolve(row);
                });
            });
        });
    });
}

/**
 * Удаляет роль из базы данных по указанному ID.
 * @param {string} id - ID роли для удаления
 * @returns {Promise<string>} Промис, который разрешается строкой "OK" при успешном удалении
 * @throws {Error} Если произошла ошибка при удалении роли
 */
async function deleteRole(id) {
    const sql = "DELETE FROM roles WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                reject(new Error("Ошибка удаление роли с id: ", id));
            } else {
                console.log(`РОль с id ${id} удалена`);
                resolve("OK");
            }
        });
    });
}

module.exports = {
    getRoles,
    addRole,
    updateRole,
    deleteRole,
}