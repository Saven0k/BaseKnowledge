const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database path
const dbPath = path.join(__dirname, "dataBase", "baseLore.db");

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Ошибка при открытии базы данных:", err.message);
	} else {
		console.log("Подключение к базе данных успешно установлено.");
		db.run(
			`CREATE TABLE IF NOT EXISTS users (
            id TEXT AUTO_INCREMENT PRIMARY KEY,
            email TEXT,
            password TEXT,
			countVisit INTEGER,
			role TEXT
        )`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица users успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS posts (
			id TEXT AUTO_INCREMENT PRIMARY KEY,
			title TEXT,
			content TEXT,
			role TEXT,
			role_context TEXT,
			status TEXT,
			date_created DATE,
			image_path TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица posts успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS groups (
				id TEXT PRIMARY KEY,
				name TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица groups успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS cities (
				id TEXT PRIMARY KEY,
				name TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица cities успешно создана или уже существует."
					);
				}
			}
		);
		db.run(
			`CREATE TABLE IF NOT EXISTS roles (
				id TEXT PRIMARY KEY,
				name TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица roles успешно создана или уже существует."
					);
				}
			}
		);

		db.run(
			`CREATE TABLE IF NOT EXISTS visitors (
		    id TEXT AUTO_INCREMENT PRIMARY KEY,
			date_visit TEXT
		)`,
			(err) => {
				if (err) {
					console.error("Ошибка при создании таблицы:", err.message);
				} else {
					console.log(
						"Таблица visitors успешно создана или уже существует."
					);
				}
			}
		);
	}
});

module.exports = db;