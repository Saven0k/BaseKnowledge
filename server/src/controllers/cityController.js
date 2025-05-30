const {
    getCities,
    addCity,
    updateCity,
    deleteCity
} = require('../db/services/cities')

exports.getCities = async (req, res) => {
    try {
        const cities = await getCities();
        res.json({ cities: cities });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.addCity = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await addCity(name);
        res.json({ response });
    } catch (error) {
        console.log("ошибка");
        res.status(500).json({ message: error.message });
    }
};

exports.updateCity = async (req, res) => {
    const { id, name } = req.body;
    try {
        await updateCity(id, name);
        res.json({ message: "Данные о городе изменены" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCity = async (req, res) => {
	try {
		const { id: cityId } = req.params;
		await deleteCity(cityId);
		res.json({ message: "City deleted successfully", status: 'ok' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};