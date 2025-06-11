/**
 * Получает список всех групп университета с сервера
 * @returns {Promise<Array>} Промис с массивом групп университета
 * @throws {Error} Если произошла ошибка при запросе
 */
export async function getUniversityGroups() {
    try {
        // Отправка GET-запроса к API для получения списка групп
        const response = await fetch("http://localhost:5000/api/university/groups");

        // Преобразование ответа в JSON-формат
        const data = await response.json();

        // Проверка успешности запроса
        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить список групп университета"
            );
        }

        // Возврат полученного списка групп
        return data.universityGroups;
    } catch (error) {
        // Логирование и передача ошибки дальше
        console.error("Ошибка при получении групп университета:", error);
        throw error;
    }
}

/**
 * Создает новую группу университета
 * @param {string} universityGroupName Название новой группы
 * @returns {Promise<Object>} Промис с данными созданной группы
 * @throws {Error} Если произошла ошибка при создании
 */
export async function addUniversityGroup(universityGroupName) {
    try {
        // Отправка POST-запроса для создания новой группы
        const response = await fetch("http://localhost:5000/api/university/groups/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Указание формата данных
            },
            // Передача названия группы в теле запроса
            body: JSON.stringify({ universityGroupName: universityGroupName })
        });

        // Преобразование ответа в JSON-формат
        const data = await response.json();

        // Проверка успешности операции
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при создании группы университета");
        }

        // Возврат данных созданной группы
        return data;
    } catch (error) {
        // Логирование и передача ошибки дальше
        console.error("Ошибка при добавлении группы университета:", error);
        throw error;
    }
}

/**
 * Обновляет информацию о группе университета
 * @param {string} universityGroupId ID обновляемой группы
 * @param {string} universityGroupName Новое название группы
 * @returns {Promise<boolean>} true при успешном обновлении, false при ошибке
 */
export async function updateUniversityGroup(universityGroupId, universityGroupName) {
    try {
        // Отправка PUT-запроса для обновления группы
        const response = await fetch(`http://localhost:5000/api/university/groups/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            // Передача ID и нового названия группы
            body: JSON.stringify({ id: universityGroupId, name: universityGroupName }),
        });

        // Преобразование ответа в JSON-формат
        const data = await response.json();

        // Проверка успешности операции
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при обновлении группы университета");
        }

        // Возврат true при успешном обновлении
        return true;
    } catch (error) {
        // Логирование ошибки и возврат false
        console.error("Ошибка при обновлении группы университета:", error);
        return false;
    }
};

/**
 * Удаляет группу университета по ID
 * @param {string} universityGroupId ID удаляемой группы
 * @returns {Promise<boolean>} true при успешном удалении, false при ошибке
 */
export async function deleteUniversityGroup(universityGroupId) {
    try {
        // Отправка DELETE-запроса для удаления группы
        const response = await fetch(`http://localhost:5000/api/university/groups/delete/${universityGroupId}`, {
            method: "DELETE",
        });

        // Преобразование ответа в JSON-формат
        const data = await response.json();

        // Проверка успешности операции
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении группы университета");
        }

        // Возврат true при успешном удалении
        return true;
    } catch (error) {
        // Логирование ошибки и возврат false
        console.error("Ошибка при удалении группы университета:", error);
        return false;
    }
}