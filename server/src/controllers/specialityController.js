const {
    getSpecialities,
    addSpeciality,
    updateSpeciality,
    deleteSpeciality,
} = require('../db/services/specialities');

exports.getSpecialities = async (req, res) => {
    try {
        const specialities = await getSpecialities();
        res.json({ specialities: specialities });
    } catch (error) {
        console.log("Ошибка отправки списка специальностей");
        res.status(500).json({ message: error.message });
    }
};
exports.addSpeciality = async (req, res) => {
    const { specialityName: specialityName } = req.body;
    try {
        const response = await addSpeciality(specialityName);
        res.json({ response });
    } catch (error) {
        console.log("Ошибка добавления новой специальности в таблицу");
        res.status(500).json({ message: error.message });
    }
};

exports.updateSpeciality = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateSpeciality(id, name);
        res.json({ message: "Данные о специальности изменены" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSpeciality = async (req, res) => {
    try {
        const { id: id } = req.params;
        await deleteSpeciality(id);
        res.json({ message: "Специальность успешно удалена", status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};