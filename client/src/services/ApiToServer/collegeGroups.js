/**
 * Получает список всех групп колледжа с сервера
 * @returns {Promise<Array>} Промис с массивом объектов групп
 * @throws {Error} В случае ошибки при выполнении запроса
 */
export async function getCollegeGroups() {
    try {
        // Отправляем GET-запрос к API для получения групп
        const response = await fetch("http://localhost:5000/api/college/groups");
        // Преобразуем ответ в JSON
        const data = await response.json();

        // Проверяем статус ответа сервера
        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить список групп колледжа"
            );
        }

        // Возвращаем полученные данные
        return data.groups;
    } catch (error) {
        // Логируем ошибку и пробрасываем дальше
        console.error("Ошибка при получении групп колледжа:", error);
        throw error;
    }
}

/**
 * Добавляет новую группу в колледж
 * @param {string} collegeGroupName Название новой группы
 * @returns {Promise<Object>} Промис с данными созданной группы
 * @throws {Error} В случае ошибки при создании
 */
export async function addCollegeGroup(collegeGroupName) {
    try {
        // Отправляем POST-запрос для создания группы
        const response = await fetch("http://localhost:5000/api/college/groups/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Указываем формат JSON
            },
            // Передаем название группы в теле запроса
            body: JSON.stringify({ collegeGroupName: collegeGroupName })
        });

        // Получаем и парсим ответ сервера
        const data = await response.json();

        // Проверяем успешность операции
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при создании группы колледжа");
        }

        // Возвращаем данные созданной группы
        return data;
    } catch (error) {
        // Логируем и пробрасываем ошибку
        console.error("Ошибка при добавлении группы колледжа:", error);
        throw error;
    }
}

/**
 * Обновляет данные группы колледжа
 * @param {string} collegeGroupId ID группы для обновления
 * @param {string} collegeGroupName Новое название группы
 * @returns {Promise<boolean>} true при успешном обновлении
 */
export const updateCollegeGroup = async (collegeGroupId, collegeGroupName) => {
    try {
        // Отправляем PUT-запрос для обновления
        const response = await fetch(`http://localhost:5000/api/college/groups/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            // Передаем ID и новое название
            body: JSON.stringify({ id: collegeGroupId, name: collegeGroupName }),
        });

        // Получаем ответ сервера
        const data = await response.json();

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при обновлении группы колледжа");
        }

        // Возвращаем true при успехе
        return true;
    } catch (error) {
        // Логируем ошибку и возвращаем false
        console.error("Ошибка при обновлении группы колледжа:", error);
        return false;
    }
};

/**
 * Удаляет группу колледжа по ID
 * @param {string} collegeGroupId ID группы для удаления
 * @returns {Promise<boolean>} true при успешном удалении
 */
export async function deleteCollegeGroup(collegeGroupId) {
    try {
        // Отправляем DELETE-запрос
        const response = await fetch(`http://localhost:5000/api/college/groups/delete/${collegeGroupId}`, {
            method: "DELETE",
        });

        // Получаем ответ сервера
        const data = await response.json();

        // Проверяем успешность операции
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении группы колледжа");
        }

        // Возвращаем true при успехе
        return true;
    } catch (error) {
        // Логируем ошибку и возвращаем false
        console.error("Ошибка при удалении группы колледжа:", error);
        return false;
    }
}