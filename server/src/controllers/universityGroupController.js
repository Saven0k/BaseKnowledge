const {
    getUniversityGroups,
    addUniversityGroup,
    updateUniversityGroup,
    deleteUniversityGroup,
} = require('../db/services/universityGroups');

exports.getUniversityGroups = async (req, res) => {
    try {
        const universityGroups = await getUniversityGroups();
        res.json({ universityGroups: universityGroups });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.addUniversityGroup = async (req, res) => {
    const { universityGroupName } = req.body;
    try {
        const response = await addUniversityGroup(universityGroupName);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUniversityGroup = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateUniversityGroup(id, name);
        res.json({ message: "Группа университета обновлена" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUniversityGroup = async (req, res) => {
    try {
        const { id: id } = req.params;
        await deleteUniversityGroup(id);
        res.json({ message: "Группа университета успешно удалена", status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};