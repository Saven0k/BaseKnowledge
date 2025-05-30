const {
    getAllUsers,
    getAllUsersVisits,
    getUserVisists,
    updateUserVisits,
    createUser,
    updateUser,
    deleteUser,
    findUser,
} = require('..//db/services/users')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserVisitAll = async (req, res) => {
    try {
        const totalVisits = await getAllUsersVisits();
        res.json(totalVisits);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getUserVisits = async (req, res) => {
    const { email } = req.body;
    try {
        const visitCount = await getUserVisists(email);
        res.json(visitCount);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.updateUserVisit = async (req, res) => {
    const { email, countVisit } = req.body;
    try {
        await updateUserVisits(email, countVisit);
        res.json({ message: "Пользователь обновлен" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const result = await createUser(email, password, role);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id, email, password, countVisit, role } = req.body;
    try {
        await updateUser(id, email, password, countVisit, role);
        res.json({ message: "Пользователь обновлен" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        await deleteUser(userId);
        res.json({ message: "User deleted successfully", status: "ok" });
    } catch (err) {
        console.error("Error deleting user: ", err);
        res.status(500).send("Error deleting user");
    }
};

exports.findUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const response = await findUser(email, password);
		res.json({ response });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


