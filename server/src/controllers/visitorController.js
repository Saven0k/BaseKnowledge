const {
    getAllStudentVisits,
    addStudentVisitor,
} = require('../db/services/visitors');

// Получение всех записей о посещениях студентов
exports.getAllStudentVisits = async (req, res) => {
    try {
        const data = await getAllStudentVisits();
        res.json({ data });
    } catch (error) {
        console.log("Ошибка при получении записей о посещениях:", error);
        res.status(500).json({ message: error.message });
    }
};

// Добавление новой записи о посещении студента
exports.addStudentVisitor = async (req, res) => {
    try {
        data = await addStudentVisitor();
        res.status(200).send('OK');
    } catch (error) {
        console.log("Ошибка при добавлении записи о посещении:", error);
        res.status(500).json({ message: error.message });
    }
};