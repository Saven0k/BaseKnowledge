const {
    getAllStudentVisits,
    addStudentVisitor,

} = require('../db/services/visitors');

exports.getAllStudentVisits = async (req, res) => {
    try {
        const data = await getAllStudentVisits();
        res.json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addStudentVisitor = async (req, res) => {
	try {
		data = await addStudentVisitor();
		res.status(200).send('OK');
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
};