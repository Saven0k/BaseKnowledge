const {
    getCollegeGroups,
    addCollegeGroup,
    deleteCollegeGroup,
    updateCollegeGroup,
} = require('../db/services/collegeGroups');

exports.getCollegeGroups = async (req, res) => {
    try {
        const collegeGroups = await getCollegeGroups();
        res.json({ groups: collegeGroups });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.addCollegeGroup = async (req, res) => {
    const { collegeGroupName } = req.body;
    try {
        const response = await addCollegeGroup(collegeGroupName);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCollegeGroup = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateCollegeGroup(id, name);
        res.json({ message: "Группа колледжа обновлена" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCollegeGroup = async (req, res) => {
    try {
        const { id: id } = req.params;
        await deleteCollegeGroup(id);
        res.json({ message: "Группа колледжа успешно удалена", status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};