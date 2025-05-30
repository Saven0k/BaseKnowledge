const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');

/**
 * Асинхронно получает список всех городов из базы данных.
 * @returns {Promise<Array>} Промис, который разрешается массивом объектов городов
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных
 */
async function getCities() {
    const sql = `SELECT * FROM cities`;

    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех городов"));
            }
            resolve(rows);
        });
    });
}


/**
 * Добавляет новый город в базу данных.
 * @param {string} cityName - Название города для добавления
 * @returns {Promise<Object>} Промис, который разрешается объектом с ID созданного города {cityId: string}
 * @throws {Error} Если произошла ошибка при добавлении города
 */
async function addCity(cityName) {
    const cityId = generateUniqueId('city');
    const sql = 'INSERT INTO cities (id, name) VALUES ( ?, ? )'
    return new Promise((resolve, reject) => {
        db.run(sql, [cityId, cityName], function (err) {
            if (err) {
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления города'));
            }
            console.log("City added");
            resolve({
                cityId,
            })
        })
    })
}

/**
 * Обновляет информацию о городе в базе данных.
 * @param {string} id - ID города для обновления
 * @param {string} cityName - Новое название города
 * @returns {Promise<Object>} Промис, который разрешается обновленным объектом города
 * @throws {Error} Если произошла ошибка при обновлении или город не найден
 */
async function updateCity(id, cityName) {
    const updateSql = `UPDATE cities SET name = ? WHERE id = ?`;

    // Обновляем пост и затем получаем обновленные данные
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Выполняем обновление
            db.run(updateSql, [cityName, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления города"));
                }

                // После успешного обновления получаем обновленный пост
                db.get(`SELECT * FROM cities WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленного города:", err.message);
                        return reject(new Error("Ошибка при получении обновленного города"));
                    }
                    if (!row) {
                        return reject(new Error("Город не найден после обновления"));
                    }
                    console.log("Город обновлен и возвращен");
                    resolve(row);
                });
            });
        });
    });
}

/**
 * Удаляет город из базы данных по указанному ID.
 * @param {string} id - ID города для удаления
 * @returns {Promise<string>} Промис, который разрешается строкой "OK" при успешном удалении
 * @throws {Error} Если произошла ошибка при удалении города
 */
async function deleteCity(id) {
    const sql = "DELETE FROM cities WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                reject(new Error("Ошибка удаление города с id: ", id));
            } else {
                console.log(`Город с id ${id} удален`);
                resolve("OK");
            }
        });
    });
}

module.exports = {
    getCities,
    addCity,
    updateCity,
    deleteCity,
}