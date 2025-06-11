const {
    getClasses,
    addClass,
    updateClass,
    deleteClass
} = require('../db/services/classes')

exports.getClasses = async (req, res) => {
    try {
        const classes = await getClasses();
        res.json({ classes: classes });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.addClass = async (req, res) => {
    const { newClassName } = req.body;
    try {
        const response = await addClass(newClassName);
        res.json({ response });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.updateClass = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateClass(id, name);
        res.json({ message: "Данные о городе изменены" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteClass = async (req, res) => {
	try {
		const { id: cityId } = req.params;
		await deleteClass(cityId);
		res.json({ message: "City deleted successfully", status: 'ok' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};