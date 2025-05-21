/**
 * 🔐 ROLES MANAGEMENT API
 * 
 * Набор методов для управления ролями в системе
 * Все методы возвращают Promises и поддерживают async/await
 */

/**
 * 📋 Получает список всех ролей
 * @returns {Promise<Array>} Массив объектов ролей
 * @throws {Error} При ошибке запроса к серверу
 * 
 * @example
 * try {
 *   const roles = await getRoles();
 *   console.log('Доступные роли:', roles);
 * } catch (error) {
 *   console.error('Ошибка загрузки ролей', error);
 * }
 */
export async function getRoles() {
    try {
        const response = await fetch("/api/roles");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить список ролей"
            );
        }

        return data.roles;
    } catch (error) {
        console.error("🚨 Ошибка при получении списка ролей:", error);
        throw error; // Пробрасываем ошибку для обработки в вызывающем коде
    }
}

/**
 * ➕ Добавляет новую роль
 * @param {string} name - Название новой роли
 * @returns {Promise<Object>} Ответ сервера с данными созданной роли
 * @throws {Error} При ошибке создания
 * 
 * @example
 * await addRole('moderator');
 */
export async function addRole(name) {
    try {
        const response = await fetch("/api/roles/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при создании роли");
        }

        return data;
    } catch (error) {
        console.error("🚨 Ошибка при добавлении роли:", error);
        throw error;
    }
}

/**
 * ✏️ Обновляет существующую роль
 * @param {string|number} id - ID роли для обновления
 * @param {string} name - Новое название роли
 * @returns {Promise<boolean>} true - если успешно, false - при ошибке
 * 
 * @example
 * const success = await updateRole(3, 'supervisor');
 * if (success) console.log('Роль успешно обновлена');
 */
export const updateRole = async (id, name) => {
    try {
        const response = await fetch(`/api/roles/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при обновлении роли");
        }

        return true;
    } catch (error) {
        console.error(`🚨 Ошибка при обновлении роли ${id}:`, error);
        return false;
    }
};

/**
 * 🗑️ Удаляет роль
 * @param {string|number} id - ID роли для удаления
 * @returns {Promise<boolean>} true - если успешно, false - при ошибке
 * 
 * @example
 * if (await deleteRole(2)) {
 *   console.log('Роль успешно удалена');
 * }
 */
export async function deleteRole(id) {
    try {
        const response = await fetch(`/api/roles/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении роли");
        }

        return true;
    } catch (error) {
        console.error(`🚨 Ошибка при удалении роли ${id}:`, error);
        return false;
    }
}