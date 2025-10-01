const {
    getSpecialities,
    addSpeciality,
    updateSpeciality,
    deleteSpeciality,
} = require('../db/services/specialities');

// Получение списка всех специальностей
exports.getSpecialities = async (req, res) => {
    try {
        const specialities = await getSpecialities();
        res.json({ specialities: specialities });
    } catch (error) {
        console.log("Ошибка при получении списка специальностей:", error);
        res.status(500).json({ message: error.message });
    }
};

// Добавление новой специальности
exports.addSpeciality = async (req, res) => {
    const { specialityName } = req.body;

    // Проверка наличия названия специальности
    if (!specialityName) {
        return res.status(400).json({ message: "Название специальности обязательно" });
    }

    try {
        const response = await addSpeciality(specialityName);
        res.status(201).json({ response });
    } catch (error) {
        console.log("Ошибка при добавлении специальности:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обновление данных специальности
exports.updateSpeciality = async (req, res) => {
    const { id, name } = req.body;

    // Проверка обязательных полей
    if (!id || !name) {
        return res.status(400).json({ message: "ID и название специальности обязательны" });
    }

    try {
        await updateSpeciality(id, name);
        res.json({ message: "Данные о специальности изменены" });
    } catch (error) {
        console.log("Ошибка при обновлении специальности:", error);
        res.status(500).json({ message: error.message });
    }
};

// Удаление специальности
exports.deleteSpeciality = async (req, res) => {
    try {
        const { id } = req.params;

        // Проверка наличия ID
        if (!id) {
            return res.status(400).json({ message: "ID специальности обязателен" });
        }

        await deleteSpeciality(id);
        res.json({ message: "Специальность успешно удалена", status: 'ok' });
    } catch (error) {
        console.log("Ошибка при удалении специальности:", error);
        res.status(500).json({ message: error.message });
    }
};