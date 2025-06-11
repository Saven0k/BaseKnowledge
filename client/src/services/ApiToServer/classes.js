// Асинхронная функция для получения списка классов
export async function getClasses() {
    try {
        // Отправляем GET-запрос к API для получения классов
        const response = await fetch("http://localhost:5000/api/classes");
        // Парсим ответ в формате JSON
        const data = await response.json();

        // Если ответ не успешный, выбрасываем ошибку
        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить класс"
            );
        }

        // Возвращаем полученные данные (предполагается, что это массив городов)
        return data.classes;
    } catch (error) {
        // Логируем ошибку в консоль и пробрасываем её дальше
        console.error("Ошибка при получении классов:", error);
        throw error;
    }
}

// Асинхронная функция для добавления нового класса
export async function addClass(newClassName) {
    try {
        // Отправляем POST-запрос для создания нового класса
        const response = await fetch("http://localhost:5000/api/classes/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Передаем имя класса в теле запроса
            body: JSON.stringify({
                newClassName: newClassName
            }),
        });

        // Парсим ответ сервера
        const data = await response.json();

        // Если ответ не успешный, выбрасываем ошибку
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при добавлении класса");
        }

        // Возвращаем данные ответа
        return data;
    } catch (error) {
        // Логируем ошибку и пробрасываем её дальше
        console.error("Ошибка при добавлении класса:", error);
        throw error;
    }
};

// Асинхронная функция для обновления существующего класса
export const updateClass = async (id, name) => {
    try {
        // Отправляем PUT-запрос для обновления класса с указанным ID
        const res = await fetch(`http://localhost:5000/api/classes/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            // Передаем ID и новое имя класса в теле запроса
            body: JSON.stringify({
                id: id,
                name: name,
            }),
        });

        // Парсим ответ сервера
        const data = await res.json();

        // Если ответ не успешный, выбрасываем ошибку
        if (!res.ok) {
            throw new Error(data.message || "Ошибка при обновлении класса");
        }

        // Возвращаем true при успешном обновлении
        return true;
    } catch (err) {
        // Логируем ошибку и возвращаем false
        console.error("Ошибка при обновлении класса:", err);
        return false;
    }
};

// Асинхронная функция для удаления класса
export async function deleteClass(id) {
    try {
        // Отправляем DELETE-запрос для удаления класса с указанным ID
        const response = await fetch(`http://localhost:5000/api/classes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Парсим ответ сервера
        const data = await response.json();

        // Если ответ не успешный, выбрасываем ошибку
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении класса");
        }

        // Возвращаем true при успешном удалении
        return true;
    } catch (err) {
        // Логируем ошибку и возвращаем false
        console.error("Ошибка при удалении класса:", err);
        return false;
    }
}