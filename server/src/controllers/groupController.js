const {
    getStudentGroups,
    addStudentGroup,
    deleteGroup,
    updateGroup,
} = require('../db/services/groups');

exports.getStudentGroups = async (req, res) => {
    try {
        const groups = await getStudentGroups();
        res.json({ groups });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.addStudentGroup = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await addStudentGroup(name);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteGroup = async (req, res) => {
    try {
        const { id: id } = req.params;
        await deleteGroup(id);
        res.json({ message: "Group deleted successfully", status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGroup = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateGroup(id, name);
        res.json({ message: "Группа обновлена" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};