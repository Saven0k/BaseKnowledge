const {
    getRoles,
    addRole,
    updateRole,
    deleteRole,
} = require('../db/services/roles');

// Получение списка всех ролей
exports.getRoles = async (req, res) => {
    try {
        const roles = await getRoles();
        res.json({ roles: roles });
    } catch (error) {
        console.log("Ошибка при получении списка ролей:", error);
        res.status(500).json({ message: error.message });
    }
};

// Добавление новой роли
exports.addRole = async (req, res) => {
    const { name } = req.body;

    // Проверка наличия названия роли
    if (!name) {
        return res.status(400).json({ message: "Название роли обязательно" });
    }

    try {
        const response = await addRole(name);
        res.status(201).json({ response }); 
    } catch (error) {
        console.log("Ошибка при добавлении роли:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обновление данных роли
exports.updateRole = async (req, res) => {
    const { id, name } = req.body;

    // Проверка обязательных полей
    if (!id || !name) {
        return res.status(400).json({ message: "ID и название роли обязательны" });
    }

    try {
        await updateRole(id, name);
        res.json({ message: "Данные о роли изменены" });
    } catch (error) {
        console.log("Ошибка при обновлении роли:", error);
        res.status(500).json({ message: error.message });
    }
};

// Удаление роли
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        // Проверка наличия ID
        if (!id) {
            return res.status(400).json({ message: "ID роли обязателен" });
        }

        await deleteRole(id);
        res.json({ message: "Роль успешно удалена", status: 'ok' });
    } catch (error) {
        console.log("Ошибка при удалении роли:", error);
        res.status(500).json({ message: error.message });
    }
};