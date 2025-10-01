const {
    getGroups,
    addGroup,
    deleteGroup,
    updateGroup,
} = require('../db/services/groups');

// Получение всех групп
exports.getGroups = async (req, res) => {
    try {
        const groups = await getGroups();
        res.json({ groups: groups });
    } catch (error) {
        console.log("Ошибка при получении групп:", error);
        res.status(500).json({ message: error.message });
    }
};

// Добавление новой группы
exports.addGroup = async (req, res) => {
    const { collegeGroupName } = req.body;


    // Проверка наличия названия группы
    if (!collegeGroupName) {
        return res.status(400).json({ message: "Название группы обязательно" });
    }

    try {
        const response = await addGroup(collegeGroupName);
        res.status(201).json({ response });
    } catch (error) {
        console.log("Ошибка при добавлении группы:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обновление данных группы
exports.updateGroup = async (req, res) => {
    const { id, name } = req.body;

    // Проверка обязательных полей
    if (!id || !name) {
        return res.status(400).json({ message: "ID и название группы обязательны" });
    }

    try {
        await updateGroup(id, name);
        res.json({ message: "Группа колледжа обновлена" });
    } catch (error) {
        console.log("Ошибка при обновлении группы:", error);
        res.status(500).json({ message: error.message });
    }
};

// Удаление группы
exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        // Проверка наличия ID
        if (!id) {
            return res.status(400).json({ message: "ID группы обязателен" });
        }

        await deleteGroup(id);
        res.json({ message: "Группа колледжа успешно удалена", status: 'ok' });
    } catch (error) {
        console.log("Ошибка при удалении группы:", error);
        res.status(500).json({ message: error.message });
    }
};