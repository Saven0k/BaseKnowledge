/**
 * 📋 Получает список всех пользователей
 * @returns {Promise<Array>} Массив пользователей
 * @throws {Error} Если не удалось получить данные
 */
export async function getUsers() {
    try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Не удалось получить список пользователей");
        }

        return data.users;
    } catch (error) {
        console.error("Ошибка при получении списка пользователей:", error);
        throw error;
    }
}

/**
 * ✏️ Обновляет данные пользователя
 * @param {string|number} userId - ID пользователя
 * @param {string} email - Новый email
 * @param {string} password - Новый пароль
 * @returns {Promise<boolean>} true при успешном обновлении
 */
export const updateUser = async (userId, email, password, countVisit, role) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/update/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, email, password, countVisit, role })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка обновления пользователя");

        return true;
    } catch (error) {
        console.error(`Ошибка при обновлении пользователя ${userId}:`, error);
        return false;
    }
};

/**
 * ➕ Добавляет нового пользователя
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<Object>} Данные созданного пользователя
 * @throws {Error} Если не удалось создать пользователя
 */
export async function addUser(email, password, role) {
    try {
        const response = await fetch("http://localhost:5000/api/users/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка создания пользователя");

        return data;
    } catch (error) {
        console.error("Ошибка при добавлении пользователя:", error);
        throw error;
    }
}

/**
 * 🗑️ Удаляет пользователя
 * @param {string|number} id - ID пользователя
 * @returns {Promise<boolean>} true при успешном удалении
 */
export async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:5000/api/users/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка удаления пользователя");

        return true;
    } catch (error) {
        console.error(`Ошибка при удалении пользователя ${id}:`, error);
        return false;
    }
}

/**
 * 🔍 Поиск пользователя по учетным данным
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<boolean>} true если пользователь найден
 */
export async function findUser(email, password) {
    try {
        const response = await fetch(`http://localhost:5000/api/users/find`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка поиска пользователя");

        return data.response;
    } catch (error) {
        console.error("Ошибка при поиске пользователя:", error);
        return false;
    }
}

/**
 * 📊 Получает общее количество посещений
 * @returns {Promise<number>} Общее число посещений
 * @throws {Error} Если не удалось получить данные
 */
export async function getTotalVisits() {
    try {
        const response = await fetch("http://localhost:5000/api/users/visit/all");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Не удалось получить количество посещений");
        }

        return data.totalVisits;
    } catch (error) {
        console.error("Ошибка при получении общего количества посещений:", error);
        throw error;
    }
}

/**
 * 👨🏫 Получает количество посещений для преподавателя
 * @param {string} teacherEmail - Email преподавателя
 * @returns {Promise<number>} Количество посещений
 * @throws {Error} Если не удалось получить данные
 */
export async function getTeacherVisits(teacherEmail) {
    try {
        const response = await fetch("http://localhost:5000/api/users/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: teacherEmail })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Не удалось получить количество посещений");
        }

        return data.countVisit;
    } catch (error) {
        console.error(`Ошибка при получении посещений для ${teacherEmail}:`, error);
        throw error;
    }
}

/**
 * 🔄 Обновляет количество посещений для преподавателя
 * @param {string} teacherEmail - Email преподавателя
 * @param {number} countVisit - Новое количество посещений
 * @returns {Promise<boolean>} true при успешном обновлении
 */
export const updateTeacherVisits = async (teacherEmail, countVisit) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/visit/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: teacherEmail, countVisit })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка обновления посещений");

        return true;
    } catch (error) {
        console.error(`Ошибка при обновлении посещений для ${teacherEmail}:`, error);
        return false;
    }
};