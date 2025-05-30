const db = require('../db');
const generateUniqueId = require('../utils/generateUniqueId');
const formatDate = require('../utils/formateData')
const path = require('path');
const fs = require('fs');


/**
 * Создает пост с прикрепленным изображением.
 * @param {string} title - Заголовок поста
 * @param {string} content - Содержание поста
 * @param {string} role - Роль, для которой предназначен пост
 * @param {boolean} status - Флаг публичности поста
 * @param {Array<string>} role_context - Массив групп студентов
 * @param {Object} image - Объект изображения (multer)
 * @returns {Promise<Object>} Объект с ID поста и сообщением об успехе
 * @throws {Error} При ошибке загрузки изображения или записи в БД
 */
async function createPostWithImage(title, content, role, status, role_context, image) {
    const userId = generateUniqueId('post');
    let image_path = '';
    try {
        if (image) {
            const ext = path.extname(image.originalname);
            const filename = `${Date.now()}${ext}`;
            image_path = path.join('uploads', filename);
            await fs.promises.writeFile(path.join(__dirname, image_path), image.buffer);
        }

        const sql = `INSERT INTO posts (id, title, content, role, role_context, status, date_created, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [userId, title, content, role, JSON.stringify(role_context.split(',')), status, formatDate(), image_path], function (err) {
                if (err) {
                    console.error("Ошибка базы данных:", err.message);
                    return reject(new Error("Ошибка регистрации поста"));
                }

                resolve({
                    userId,
                    message: `Запись успешно зарегистрирована: ${title}`,
                });
            });
        });
    } catch (error) {
        console.log("some image error");

        if (image_path) {
            try {
                await fs.promises.unlink(path.join(__dirname, image_path));
            } catch (unlinkError) {
                console.error('Ошибка удаления изображения:', unlinkError);
            }
        }
        throw error;
    }
};

/**
 * Получает все посты из базы данных.
 * @returns {Promise<Array>} Массив всех постов
 * @throws {Error} При ошибке запроса к базе данных
 */
async function getAllPosts() {
    console.log("getting all posts");

    const sql = `SELECT * FROM posts`;
    return new Promise((resolve, reject) => {
        db.all(sql, function (err, rows) {
            if (err) return reject(new Error("Ошибка вывода всех постов"));
            resolve(rows);
        });
    });
}

/**
 * Находит пост по его идентификатору.
 * @param {string} id - ID поста
 * @returns {Promise<Object>} Объект поста
 * @throws {Error} При ошибке запроса или если пост не найден
 */
async function getPostById(id) {
    const sql = `SELECT * FROM posts WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.all(sql, [id], function (err, rows) {
            if (err) return reject(new Error("Ошибка вывода поста"));
            resolve(rows[0] || null);
        });
    });
}



// async function getPostsByRoleByStatusByContext(role, status, context) {
//     console.log(role, context, status)
//     if (context === null) {
//         context = '"null"'

//     }
//     const sql = `SELECT * FROM posts WHERE role = ? AND status = ? AND role_context = ?`;

//     return new Promise((resolve, reject) => {
//         db.all(sql, [role, status, context], function (err, rows) {
//             if (err) {
//                 console.error("Ошибка базы данных:", err.message);
//                 return reject(new Error("Ошибка получения постов по роли"));
//             }
//             resolve(rows);
//         });
//     });
// }
async function getPostsByRoleByStatusByContext(role, status, role_context) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM posts WHERE role = ? AND status = ?`,
            [role, status],
            (err, rows) => {
                if (err) {
                    console.error("Ошибка базы данных:", err.message);
                    return reject(new Error("Ошибка получения студенческих постов"));
                }
                if (role != 'all' && role !== 'teacher') {

                    const matchingPosts = rows.filter(post => {
                        try {
                            // Если у поста нет role_context - пропускаем
                            if (post.role_context === "null") {
                                console.log("FALSEEE")
                                return false;
                            }
                            // Парсим JSON строку в массив
                            const postContexts = JSON.parse(post.role_context);
                            // Проверяем есть ли хотя бы одно совпадение между массивами
                            return Array.isArray(role_context) &&
                                Array.isArray(postContexts) &&
                                role_context.some(context =>
                                    postContexts.includes(context)
                                );
                        } catch (e) {
                            console.error(`Ошибка обработки контекста для поста ${post.id}:`, e);
                            return false;
                        }
                    });
    
                    resolve(matchingPosts);
                } else {
                    resolve(rows)
                }
            }
        );
    });
}

/**
 * Обновляет существующий пост.
 * @param {string} id - ID поста
 * @param {string} title - Новый заголовок
 * @param {string} content - Новое содержание
 * @param {string} role - Новая роль
 * @param {boolean} status - Новый флаг публичности
 * @param {Array<string>} role_context - Новый массив групп
 * @returns {Promise<Object>} Обновленный объект поста
 * @throws {Error} При ошибке обновления или если пост не найден
 */
async function updatePost(id, title, content, role, status, role_context) {
    const updateSql = `UPDATE posts SET title = ?, content = ?, role = ?, role_context = ?, status = ?, date_created = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(updateSql, [title, content, role, JSON.stringify(role_context), status, formatDate(), id], function (err) {
                if (err) return reject(new Error("Ошибка обновления поста"));

                db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => {
                    if (err) return reject(new Error("Ошибка получения обновленного поста"));
                    if (!row) return reject(new Error("Пост не найден"));
                    resolve(row);
                });
            });
        });
    });
};

async function updatePostStatus(id, status) {
    const updateSql = `UPDATE posts SET status = ?  WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(updateSql, [status, id], function (err) {
                if (err) return reject(new Error("Ошибка обновления статуса поста"));

                db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => {
                    if (err) return reject(new Error("Ошибка получения обновленного поста"));
                    if (!row) return reject(new Error("Пост не найден"));
                    resolve(row);
                });
            });
        });
    });
}

/**
 * Удаляет пост по его идентификатору.
 * @param {string} id - ID поста для удаления
 * @returns {Promise<string>} Сообщение об успешном удалении
 * @throws {Error} При ошибке удаления
 */
// async function deletePost(id) {
//     const sql = "DELETE FROM posts WHERE id = ?";
//     return new Promise((resolve, reject) => {
//         db.run(sql, [id], (err) => {
//             if (err) return reject(new Error(`Ошибка удаления поста с id: ${id}`));
//             resolve("OK");
//         });
//     });
// }

async function deletePost(id) {
    // Сначала получаем информацию о посте, чтобы узнать путь к изображению
    const getPostSql = "SELECT image_path FROM posts WHERE id = ?";

    return new Promise((resolve, reject) => {
        // Шаг 1: Находим пост и получаем путь к изображению
        db.get(getPostSql, [id], async (err, row) => {
            if (err) return reject(new Error(`Ошибка поиска поста с id: ${id}`));

            if (!row) return reject(new Error(`Пост с id ${id} не найден`));

            const imagePath = row.image_path;

            try {
                // Шаг 2: Если есть изображение - удаляем его
                if (imagePath) {
                    const fullImagePath = path.join(__dirname, imagePath);
                    try {
                        await fs.promises.unlink(fullImagePath);
                        console.log(`Изображение ${imagePath} успешно удалено`);
                    } catch (unlinkError) {
                        console.error('Ошибка удаления изображения:', unlinkError);
                        // Продолжаем удаление поста даже если не удалилось изображение
                    }
                }

                // Шаг 3: Удаляем сам пост из БД
                const deleteSql = "DELETE FROM posts WHERE id = ?";
                db.run(deleteSql, [id], function (err) {
                    if (err) return reject(new Error(`Ошибка удаления поста с id: ${id}`));

                    if (this.changes === 0) {
                        return reject(new Error(`Пост с id ${id} не найден`));
                    }

                    resolve("OK");
                });

            } catch (error) {
                reject(new Error(`Ошибка при удалении поста: ${error.message}`));
            }
        });
    });
}
module.exports = {
    createPostWithImage,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostsByRoleByStatusByContext,
    updatePostStatus,
}