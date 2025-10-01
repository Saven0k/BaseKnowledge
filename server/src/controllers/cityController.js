const {
    getCities,
    addCity,
    updateCity,
    deleteCity
} = require('../db/services/cities')

// Получение списка всех городов
exports.getCities = async (req, res) => {
    try {
        const cities = await getCities();
        res.json({ cities: cities });
    } catch (error) {
        console.log("Ошибка при получении городов:", error); // Улучшенное логирование
        res.status(500).json({ message: error.message });
    }
};

// Добавление нового города
exports.addCity = async (req, res) => {
    const { name } = req.body;

    // Проверка наличия обязательного поля
    if (!name) {
        return res.status(400).json({ message: "Название города обязательно" });
    }

    try {
        const response = await addCity(name);
        res.status(201).json({ response }); // 201 статус для созданного ресурса
    } catch (error) {
        console.log("Ошибка при добавлении города:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обновление данных города
exports.updateCity = async (req, res) => {
    const { id, name } = req.body;

    // Проверка обязательных полей
    if (!id || !name) {
        return res.status(400).json({ message: "ID и название города обязательны" });
    }

    try {
        await updateCity(id, name);
        res.json({ message: "Данные о городе изменены" });
    } catch (error) {
        console.log("Ошибка при обновлении города:", error);
        res.status(500).json({ message: error.message });
    }
};

// Удаление города
exports.deleteCity = async (req, res) => {
    try {
        const { id: cityId } = req.params;

        // Проверка наличия ID
        if (!cityId) {
            return res.status(400).json({ message: "ID города обязателен" });
        }

        await deleteCity(cityId);
        res.json({ message: "Город успешно удален", status: 'ok' });
    } catch (error) {
        console.log("Ошибка при удалении города:", error);
        res.status(500).json({ message: error.message });
    }
};