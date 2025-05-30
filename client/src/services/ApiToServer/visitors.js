/**
 * ➕ Добавляет нового посетителя
 * @returns {Promise<void>}
 * @throws {Error} Если не удалось добавить посетителя
 * 
 * @example
 * try {
 *   await addVisitor();
 *   console.log('Посетитель успешно добавлен');
 * } catch (error) {
 *   console.error('Ошибка при добавлении посетителя:', error);
 * }
 */
export async function addVisitor() {
    try {
        const response = await fetch("http://localhost:5000/api/visitors/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Не удалось добавить посетителя");
        }
    } catch (error) {
        console.error("Ошибка при добавлении посетителя:", error);
        throw error;
    }
}

/**
 * 🔢 Получает общее количество посетителей
 * @returns {Promise<number>} Общее число посетителей
 * @throws {Error} Если не удалось получить данные
 * 
 * @example
 * try {
 *   const count = await getVisitorsCount();
 *   console.log(`Общее количество посетителей: ${count}`);
 * } catch (error) {
 *   console.error('Ошибка при получении количества посетителей:', error);
 * }
 */
export async function getVisitorsCount() {
    try {
        const response = await fetch("http://localhost:5000/api/visitors/all");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Не удалось получить количество посетителей"
            );
        }

        return data.data;
    } catch (error) {
        console.error("Ошибка при получении количества посетителей:", error);
        throw error;
    }
}