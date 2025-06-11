/**
 * Получает список специальностей с сервера
 * @returns {Promise<Array>} Промис с массивом специальностей
 * @throws {Error} Если произошла ошибка при запросе
 */
export async function getSpecialities() {
    try {
        // Отправляем GET-запрос к API для получения специальностей
        const response = await fetch("http://localhost:5000/api/specialities");
        // Парсим ответ в формате JSON
        const data = await response.json();

        // Проверяем успешность запроса
        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить список специальностей"
            );
        }

        // Возвращаем полученные данные
        return data.specialities;
    } catch (error) {
        // Логируем и пробрасываем ошибку дальше
        console.error("Ошибка при получении списка специальностей:", error);
        throw error; 
    }
}

/**
 * Добавляет новую специальность
 * @param {string} specialityName Название специальности
 * @returns {Promise<Object>} Промис с данными созданной специальности
 * @throws {Error} Если произошла ошибка при создании
 */
export async function addSpeciality(specialityName) {
    try {
        // Отправляем POST-запрос для создания специальности
        const response = await fetch("http://localhost:5000/api/specialities/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Указываем формат данных
            },
            // Передаем название специальности в теле запроса
            body: JSON.stringify({ specialityName: specialityName })
        });

        // Получаем и парсим ответ сервера
        const data = await response.json();

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при создании специальности");
        }

        // Возвращаем данные созданной специальности
        return data;
    } catch (error) {
        // Логируем и пробрасываем ошибку
        console.error("Ошибка при добавлении специальности:", error);
        throw error;
    }
}

/**
 * Обновляет данные специальности
 * @param {string} id ID специальности
 * @param {string} name Новое название специальности
 * @returns {Promise<Array>|boolean} Промис с обновленными данными или false при ошибке
 */
export const updateSpeciality = async (id, name) => {
    try {
        // Отправляем PUT-запрос для обновления
        const response = await fetch(`http://localhost:5000/api/specialities/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            // Передаем ID и новое название
            body: JSON.stringify({ id, name }),
        });

        // Получаем ответ сервера
        const data = await response.json();

        // Проверяем успешность операции
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при обновлении специальности");
        }

        // Возвращаем обновленные данные
        return data.specialities;
    } catch (error) {
        // Логируем ошибку и возвращаем false
        console.error(`Ошибка при обновлении специальности ${id}:`, error);
        return false;
    }
};

/**
 * Удаляет специальность по ID
 * @param {string} id ID специальности для удаления
 * @returns {Promise<boolean>} true при успехе, false при ошибке
 */
export async function deleteSpeciality(id) {
    try {
        // Отправляем DELETE-запрос
        const response = await fetch(`http://localhost:5000/api/specialities/delete/${id}`, {
            method: "DELETE",
        });

        // Получаем ответ сервера
        const data = await response.json();

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении специальности");
        }

        // Возвращаем true при успешном удалении
        return true;
    } catch (error) {
        // Логируем ошибку и возвращаем false
        console.error(`Ошибка при удалении специальности ${id}:`, error);
        return false;
    }
}