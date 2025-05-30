/**
 * Генерирует уникальный ID для сущности с префиксом.
 * @param {string} entityType - Тип сущности (например, "user", "post", "role").
 * @returns {string} Уникальный ID в формате "{entityType}_{timestamp}".
 * @example
 * generateUniqueId("user"); // "user_1712345678901"
 * generateUniqueId("post"); // "post_1712345678902"
 */
function generateUniqueId(entityType) {
    if (!entityType || typeof entityType !== "string") {
        throw new Error("Entity type must be a non-empty string");
    }
    return `${entityType.toLowerCase()}_${Date.now()}`;
}

module.exports = generateUniqueId;