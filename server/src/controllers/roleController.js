const {
    getRoles,
    addRole,
    updateRole,
    deleteRole,
} = require('../db/services/roles');

exports.getRoles = async (req, res) => {
    try {
        const roles = await getRoles();
        res.json({ roles: roles });
    } catch (error) {
        console.log("Ошибка отправки списка ролей");
        res.status(500).json({ message: error.message });
    }
};
exports.addRole = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await addRole(name);
        res.json({ response });
    } catch (error) {
        console.log("Ошибка добавления новой роли в таблицу");
        res.status(500).json({ message: error.message });
    }
};

exports.updateRole =  async (req, res) => {
	const { id, name } = req.body;
	try {
		await updateRole(id, name);
		res.json({ message: "Данные о роли изменены" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteRole = async (req, res) => {
	try {
		const { id: id } = req.params;
		await deleteRole(id);
		res.json({ message: "Роль успешно удалена", status: 'ok' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};