const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');


/**
 * Асинхронно получает список всех студенческих групп из базы данных.
 * @returns {Promise<Array>} Промис, который разрешается массивом объектов групп
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных
 */
async function getStudentGroups() {
    const sql = `SELECT * FROM groups`;

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех постов"));
            }
            resolve(rows);
        });
    });
}

/**
 * Добавляет новую студенческую группу в базу данных.
 * @param {string} groupName - Название группы для добавления
 * @returns {Promise<Object>} Промис, который разрешается объектом с ID созданной группы {groupId: string}
 * @throws {Error} Если произошла ошибка при добавлении группы
 */
async function addStudentGroup(groupName) {
    const groupId = generateUniqueId('group');
    const sql = 'INSERT INTO groups (id, name) VALUES ( ?, ? )'
    return new Promise((resolve, reject) => {
        db.run(sql, [groupId, groupName], function (err) {
            if (err) {
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления группы'));
            }
            console.log("Group added with", groupName);
            resolve({
                groupId,
            })
        })
    })
}

/**
 * Обновляет информацию о студенческой группе в базе данных.
 * @param {string} id - ID группы для обновления
 * @param {string} groupName - Новое название группы
 * @returns {Promise<Object>} Промис, который разрешается обновленным объектом группы
 * @throws {Error} Если произошла ошибка при обновлении или группа не найдена
 */
async function updateGroup(id, groupName) {
    const updateSql = `UPDATE groups SET name = ? WHERE id = ?`;

    // Обновляем пост и затем получаем обновленные данные
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Выполняем обновление
            db.run(updateSql, [groupName, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления группы"));
                }

                // После успешного обновления получаем обновленный пост
                db.get(`SELECT * FROM groups WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленной группы:", err.message);
                        return reject(new Error("Ошибка при получении обновленной группы"));
                    }
                    if (!row) {
                        return reject(new Error("Группа не найдена после обновления"));
                    }
                    console.log("Группа обновлена и возвращена");
                    resolve(row);
                });
            });
        });
    });
}

/**
 * Удаляет студенческую группу из базы данных по указанному ID.
 * @param {string} id - ID группы для удаления
 * @returns {Promise<string>} Промис, который разрешается строкой "OK" при успешном удалении
 * @throws {Error} Если произошла ошибка при удалении группы
 */
async function deleteGroup(id) {
    const sql = "DELETE FROM groups WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                reject(new Error("Ошибка удаление группы с id: ", id));
            } else {
                console.log(`Группа с id ${id} удалена`);
                resolve("OK");
            }
        });
    });
}

module.exports = {
    addStudentGroup,
    getStudentGroups,
    updateGroup,
    deleteGroup,
}