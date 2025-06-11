// Подключение модуля базы данных и утилиты для генерации ID
const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');

// Функция для получения всех групп колледжа из базы данных
async function getCollegeGroups() {
    // SQL-запрос для выборки всех записей из таблицы collegeGroups
    const sql = `SELECT * FROM collegeGroups`;

    // Возвращаем Promise для асинхронной работы
    return new Promise((resolve, reject) => {
        // Выполняем запрос к базе данных
        db.all(sql, function (err, rows) {
            if (err) {
                // Логируем ошибку и возвращаем отклоненный Promise
                console.error("Ошибка базы данных:", err.message);
                return reject(new Error("Ошибка вывода всех групп колледжа"));
            }
            // Возвращаем полученные строки
            console.log("Вернули группы колледжа")

            resolve(rows);
        });
    });
}

// Функция для добавления новой группы колледжа
async function addCollegeGroup(collegeGroupName) {
    // Генерируем уникальный ID для новой группы
    const groupId = generateUniqueId('collegeGroup');
    // SQL-запрос для вставки новой записи
    const sql = 'INSERT INTO collegeGroups (id, name) VALUES ( ?, ? )'

    return new Promise((resolve, reject) => {
        // Выполняем запрос с параметрами
        db.run(sql, [groupId, collegeGroupName], function (err) {
            if (err) {
                console.error('Ошибка базы данных:', err.message);
                return reject(new Error('Ошибка добавления группы для колледжа'));
            }
            console.log("Группа для колледжа добавлена", collegeGroupName);
            // Возвращаем объект с данными добавленной группы
            resolve({
                groupId,
                collegeGroupName: collegeGroupName,
            })
        })
    })
}

// Функция для обновления существующей группы колледжа
async function updateCollegeGroup(id, collegeGroupName) {
    // SQL-запрос для обновления имени группы по ID
    const updateSql = `UPDATE collegeGroups SET name = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        // Используем serialize для последовательного выполнения запросов
        db.serialize(() => {
            // Сначала обновляем запись
            db.run(updateSql, [collegeGroupName, id], function (err) {
                if (err) {
                    console.error("Ошибка базы данных при обновлении:", err.message);
                    return reject(new Error("Ошибка обновления группы колледжа"));
                }

                // Затем получаем обновленную запись для проверки
                db.get(`SELECT * FROM collegeGroups WHERE id = ?`, [id], (err, row) => {
                    if (err) {
                        console.error("Ошибка базы данных при получении обновленной группы колледжа:", err.message);
                        return reject(new Error("Ошибка при получении обновленной группы колледжа"));
                    }
                    if (!row) {
                        return reject(new Error("Группа колледжа не найдена после обновления"));
                    }
                    console.log("Группа колледжа обновлена и возвращена");
                    // Возвращаем обновленные данные группы
                    resolve(row);
                });
            });
        });
    });
}

// Функция для удаления группы колледжа по ID
async function deleteCollegeGroup(id) {
    // SQL-запрос для удаления записи
    const sql = "DELETE FROM collegeGroups WHERE id = ?";

    return new Promise((resolve, reject) => {
        // Выполняем запрос
        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Ошибка базы данных:", err.message);
                // Потенциальная проблема: в сообщении об ошибке используется конкатенация через запятую,
                // что может привести к неожиданному выводу
                reject(new Error("Ошибка удаление группы колледжа с id: ", id));
            } else {
                console.log(`Группа колледжа с id ${id} удалена`);
                // Возвращаем строку "OK" при успешном удалении
                resolve("OK");
            }
        });
    });
}

// Экспорт функций для использования в других модулях
module.exports = {
    addCollegeGroup,
    getCollegeGroups,
    updateCollegeGroup,
    deleteCollegeGroup,
}