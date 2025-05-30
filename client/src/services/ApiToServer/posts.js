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
        const response = await fetch("http://localhost:5000/api/posts");
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
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
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

export async function getPostsByContextByRoleByStatus(role, role_context, status) {
    try {
        
        const response = await fetch("http://localhost:5000/api/posts/status/context", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role, role_context, status })
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
 * ✏️ Обновляет существующий пост
 * @param {string|number} postId - ID поста
 * @param {string} updatedTitle - Новое название
 * @param {string} updatedContent - Новый текст
 * @param {string} updatedRole - Новое поле
 * @param {boolean} updatedStatus - Видимость
 * @param {string} updatedRoleContext - Группа
 * @returns {Promise<Object>} Обновленный пост
 */
export const updatePost = async (postId, updatedTitle, updatedContent, updatedRole, updatedStatus, updatedRoleContext) => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/update/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: postId,
                title: updatedTitle,
                content: updatedContent,
                role: updatedRole,
                status: updatedStatus,
                role_context: updatedRoleContext
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка обновления");
        return data.post;
    } catch (error) {
        console.error(`🚨 Ошибка обновления поста ${postId}:`, error);
        throw error;
    }
};
export const updatePostStatus = async (postId, status) => {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/update/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: postId,
                status: status,
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Ошибка обновления");

        return data;
    } catch (error) {
        console.error(`🚨 Ошибка обновления статуса у поста ${postId}:`, error);
        throw error;
    }
};


/**
 * 🖼️ Создает пост с изображением
 * @param {FormData} data - Данные формы с изображением
 * @returns {Promise<Object>} Созданный пост
 */
export async function addPost(data) {
    try {
        const response = await fetch("http://localhost:5000/api/posts/new", {
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
        const response = await fetch(`http://localhost:5000/api/posts/delete/${id}`, {
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


export async function getImage(filename) {
    try {
        const response = await fetch(`http://localhost:5000/api/posts/image`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({filename:filename})
        });

        const result = await response.blob();
        if (!response.ok) throw new Error(result.message || "Ошибка загрузки");
        return URL.createObjectURL(result);
    } catch (error) {
        console.error("🚨 Ошибка создания поста с изображением:", error);
        throw error;
    }
}