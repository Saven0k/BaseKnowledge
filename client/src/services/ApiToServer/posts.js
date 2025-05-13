/**
 * 📚 POSTS API SERVICE
 * 
 * Полный набор методов для работы с постами
 * Все функции возвращают Promises и поддерживают async/await
 */

/**
 * 🗞️ Получает список всех постов
 * @returns {Promise<Array>} Массив постов
 * @throws {Error} При ошибке запроса
 */
export async function getPosts() {
    try {
        const response = await fetch("/api/posts");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Не удалось загрузить посты");
        }

        return data.posts;
    } catch (error) {
        console.error("🚨 Ошибка получения постов:", error);
        throw error;
    }
}

/**
 * 📄 Получает конкретный пост по ID
 * @param {string|number} id - ID поста
 * @returns {Promise<Object>} Объект поста
 * @throws {Error} Если пост не найден
 */
export async function getPost(id) {
    try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Пост не найден");
        }

        return data.post;
    } catch (error) {
        console.error(`🚨 Ошибка получения поста ${id}:`, error);
        throw error;
    }
}

/**
 * 🔍 Получает посты для указанного поля
 * @param {string} role - Поле для фильтрации
 * @returns {Promise<Array>} Отфильтрованные посты
 */
export async function getPostFor(role) {
    try {
        const response = await fetch("/api/posts/role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка фильтрации");
        
        return data.posts;
    } catch (error) {
        console.error("🚨 Ошибка получения постов:", error);
        throw error;
    }
}

/**
 * 👥 Получает публичные посты для роли
 * @param {string} role - Роль пользователя
 * @returns {Promise<Array>} Публичные посты
 */
export async function getPublicPostOfRole(role) {
    try {
        const response = await fetch("/api/posts/public/role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ forField: role })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка загрузки");
        
        return data.posts;
    } catch (error) {
        console.error("🚨 Ошибка получения публичных постов:", error);
        throw error;
    }
}

/**
 * 🎓 Получает посты для студенческой группы
 * @param {string} group - Название группы
 * @returns {Promise<Array>} Посты группы
 */
export async function getPostForStudent(group) {
    try {
        const response = await fetch("/api/posts/group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ group })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка загрузки");
        
        return data.posts;
    } catch (error) {
        console.error("🚨 Ошибка получения постов группы:", error);
        throw error;
    }
}

/**
 * 👀 Получает видимые посты для поля
 * @param {string} forField - Поле для фильтрации
 * @returns {Promise<Array>} Видимые посты
 */
export async function getPostsForVisible(forField) {
    try {
        const response = await fetch("/api/posts/visible", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ forField })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка загрузки");
        
        return data.posts;
    } catch (error) {
        console.error("🚨 Ошибка получения видимых постов:", error);
        throw error;
    }
}

/**
 * ✏️ Обновляет существующий пост
 * @param {string|number} postId - ID поста
 * @param {string} updateName - Новое название
 * @param {string} updateText - Новый текст
 * @param {string} updateForFieled - Новое поле
 * @param {boolean} updateVisible - Видимость
 * @param {string} updateForGroup - Группа
 * @returns {Promise<Object>} Обновленный пост
 */
export const updatePost = async (postId, updateName, updateText, updateForFieled, updateVisible, updateForGroup) => {
    try {
        const response = await fetch(`/api/posts/update/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: postId,
                name: updateName,
                text: updateText,
                forField: updateForFieled,
                visible: updateVisible,
                group: updateForGroup
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка обновления");
        
        return data;
    } catch (error) {
        console.error(`🚨 Ошибка обновления поста ${postId}:`, error);
        throw error;
    }
};

/**
 * ➕ Создает новый пост
 * @param {string} newName - Название
 * @param {string} newText - Текст
 * @param {string} forField - Поле
 * @param {boolean} visible - Видимость
 * @param {string} group - Группа
 * @returns {Promise<Object>} Созданный пост
 */
export async function addPost(newName, newText, forField, visible, group) {
    try {
        const response = await fetch("/api/posts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newName,
                text: newText,
                forField,
                visible,
                group
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка создания");
        
        return data;
    } catch (error) {
        console.error("🚨 Ошибка создания поста:", error);
        throw error;
    }
}

/**
 * 🖼️ Создает пост с изображением
 * @param {FormData} data - Данные формы с изображением
 * @returns {Promise<Object>} Созданный пост
 */
export async function addPostWithImage(data) {
    try {
        const response = await fetch("/api/posts/addWithImage", {
            method: "POST",
            body: data
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Ошибка загрузки");
        
        return result;
    } catch (error) {
        console.error("🚨 Ошибка создания поста с изображением:", error);
        throw error;
    }
}

/**
 * 🗑️ Удаляет пост
 * @param {string|number} id - ID поста
 * @returns {Promise<boolean>} true если успешно
 */
export async function deletePost(id) {
    try {
        const response = await fetch(`/api/posts/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка удаления");
        
        return true;
    } catch (error) {
        console.error(`🚨 Ошибка удаления поста ${id}:`, error);
        return false;
    }
}