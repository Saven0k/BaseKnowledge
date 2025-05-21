/**
 * Асинхронная функция для получения списка городов с сервера
 * @returns {Promise<Array>} Массив городов или undefined в случае ошибки
 * @throws {Error} Если произошла ошибка при запросе
 */
export async function getCities() {
    try {
        const response = await fetch("/api/cities");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить города"
            );
        }

        return data.cities;
    } catch (error) {
        console.error("Ошибка при получении городов:", error);
        throw error; // Пробрасываем ошибку дальше для обработки в компоненте
    }
}

/**
 * Асинхронная функция для добавления нового города
 * @param {string} name - Название города для добавления
 * @returns {Promise<Object>} Ответ сервера
 * @throws {Error} Если произошла ошибка при запросе
 */
export async function addCity(name) {
    try {
        const response = await fetch("/api/cities/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при добавлении города");
        }

        return data;
    } catch (error) {
        console.error("Ошибка при добавлении города:", error);
        throw error;
    }
};


/**
 * Асинхронная функция для обновления города
 * @param {string|number} id - ID города для обновления
 * @param {string} name - Новое название города
 * @returns {Promise<boolean>} true если успешно, false если ошибка
 */
export const updateCity = async (id, name) => {
    try {
        const res = await fetch(`/api/cities/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                name: name,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Ошибка при обновлении города");
        }

        return true;
    } catch (err) {
        console.error("Ошибка при обновлении города:", err);
        return false;
    }
};



/**
 * Асинхронная функция для удаления города
 * @param {string|number} id - ID города для удаления
 * @returns {Promise<boolean>} true если успешно, false если ошибка
 */
export async function deleteCity(id) {
    try {
        const response = await fetch(`/api/cities/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении города");
        }

        return true;
    } catch (err) {
        console.error("Ошибка при удалении города:", err);
        return false;
    }
}