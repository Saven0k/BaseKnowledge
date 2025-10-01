const {
    getAllUsers,
    getAllUsersVisits,
    getUserVisists,
    updateUserVisits,
    createUser,
    updateUser,
    deleteUser,
    findUser,
} = require('../db/services/users');

// Получение всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ users });
    } catch (error) {
        console.log("Ошибка при получении пользователей:", error);
        res.status(500).json({ message: error.message });
    }
};

// Получение общего количества посещений всех пользователей
exports.getUserVisitAll = async (req, res) => {
    try {
        const totalVisits = await getAllUsersVisits();
        res.json(totalVisits);
    } catch (error) {
        console.error('Ошибка при получении общего количества посещений:', error);
        res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
    }
};

// Получение количества посещений конкретного пользователя
exports.getUserVisits = async (req, res) => {
    const { email } = req.body;

    // Проверка наличия email
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email обязателен' });
    }

    try {
        const visitCount = await getUserVisists(email);
        res.json(visitCount);
    } catch (error) {
        console.error('Ошибка при получении посещений пользователя:', error);
        res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
    }
};

// Обновление количества посещений пользователя
exports.updateUserVisit = async (req, res) => {
    const { email, countVisit } = req.body;

    // Проверка обязательных полей
    if (!email || countVisit === undefined) {
        return res.status(400).json({ message: "Email и количество посещений обязательны" });
    }

    try {
        await updateUserVisits(email, countVisit);
        res.json({ message: "Данные о посещениях обновлены" });
    } catch (error) {
        console.log("Ошибка при обновлении посещений:", error);
        res.status(500).json({ message: error.message });
    }
};

// Создание нового пользователя
exports.addUser = async (req, res) => {
    const { email, password, role } = req.body;

    // Проверка обязательных полей
    if (!email || !password) {
        return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    try {
        const result = await createUser(email, password, role);
        res.status(201).json(result); 
    } catch (error) {
        console.log("Ошибка при создании пользователя:", error);
        res.status(500).json({ message: error.message });
    }
};

// Обновление данных пользователя
exports.updateUser = async (req, res) => {
    const { id, email, password, countVisit, role } = req.body;

    // Проверка наличия ID
    if (!id) {
        return res.status(400).json({ message: "ID пользователя обязателен" });
    }

    try {
        await updateUser(id, email, password, countVisit, role);
        res.json({ message: "Данные пользователя обновлены" });
    } catch (error) {
        console.log("Ошибка при обновлении пользователя:", error);
        res.status(500).json({ message: error.message });
    }
};

// Удаление пользователя
exports.deleteUser = async (req, res) => {
    try {
        const { id: userId } = req.params;

        // Проверка наличия ID
        if (!userId) {
            return res.status(400).json({ message: "ID пользователя обязателен" });
        }

        await deleteUser(userId);
        res.json({ message: "Пользователь успешно удален", status: "ok" }); 
    } catch (err) {
        console.error("Ошибка при удалении пользователя: ", err);
        res.status(500).json({ message: "Ошибка при удалении пользователя" });
    }
};

// Поиск пользователя (аутентификация)
exports.findUser = async (req, res) => {
    const { email, password } = req.body;

    // Проверка обязательных полей
    if (!email || !password) {
        return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    try {
        const response = await findUser(email, password);
        res.json({ response });
    } catch (error) {
        console.log("Ошибка при поиске пользователя:", error);
        res.status(500).json({ message: error.message });
    }
};