/**
 * 🎓 STUDENT GROUPS API SERVICE
 * 
 * Набор функций для работы с группами студентов
 * Все методы возвращают Promises и должны обрабатываться с await
 */

/**
 * 📚 Получает список всех учебных групп
 * @returns {Promise<Array>} Массив объектов групп
 * @throws {Error} Если произошла ошибка при загрузке данных
 * 
 * @example
 * try {
 *   const groups = await getStudentGroups();
 *   console.log(groups);
 * } catch (error) {
 *   console.error('Ошибка загрузки групп:', error);
 * }
 */
export async function getStudentGroups() {
    try {
        const response = await fetch("/api/student/groups");
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить список групп"
            );
        }

        return data.groups;
    } catch (error) {
        console.error("🚨 Ошибка при получении групп студентов:", error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
}

/**
 * ➕ Добавляет новую учебную группу
 * @param {string} name - Название новой группы
 * @returns {Promise<Object>} Ответ сервера с данными созданной группы
 * @throws {Error} Если произошла ошибка при создании
 * 
 * @example
 * await addGroup('ИСТ-401');
 */
export async function addGroup(name) {
    try {
        const response = await fetch("/api/student/groups/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при создании группы");
        }
        
        return data;
    } catch (error) {
        console.error("🚨 Ошибка при добавлении группы:", error);
        throw error;
    }
}

/**
 * ✏️ Обновляет информацию о группе
 * @param {number|string} id - ID группы для обновления
 * @param {string} name - Новое название группы
 * @returns {Promise<boolean>} true если успешно, false при ошибке
 * 
 * @example
 * const success = await updateGroup(5, 'ИСТ-402');
 * if (success) alert('Группа обновлена!');
 */
export const updateGroup = async (id, name) => {
    try {
        const response = await fetch(`/api/student/groups/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при обновлении группы");
        }
        
        return true;
    } catch (error) {
        console.error("🚨 Ошибка при обновлении группы:", error);
        return false;
    }
};

/**
 * 🗑️ Удаляет учебную группу
 * @param {number|string} id - ID группы для удаления
 * @returns {Promise<boolean>} true если успешно, false при ошибке
 * 
 * @example
 * if (await deleteGroup(5)) {
 *   console.log('Группа удалена');
 * }
 */
export async function deleteGroup(id) {
    try {
        const response = await fetch(`/api/student/groups/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Ошибка при удалении группы");
        }
        
        return true;
    } catch (error) {
        console.error("🚨 Ошибка при удалении группы:", error);
        return false;
    }
}