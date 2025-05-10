/**
 *  Retrieves all records from the database.
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
export async function getPosts() {
	try {
		const response = await fetch("/api/posts");
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить список постов"
			);
		}

		// console.log("Список постов получен:", data.posts);
		return data.posts;
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
	}
}

export async function getPost(id) {
	try {
		const response = await fetch(`/api/posts/${id}`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить список постов"
			);
		}

		// console.log("Список постов получен:", data.posts);
		return data.post;
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
	}
}

/**
 *  Retrieves all records from the database.
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
export async function getPostFor(forField) {
	try {
		const res = await fetch("/api/posts/for", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				forField: forField,
			}),
		});
		const data = await res.json();

		if (!res.ok) {
			throw new Error(
				data.message || "Не удалось получить список постов"
			);
		}

		// console.log("Список постов получен:", data.posts);
		return data.posts;
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
	}
}
/**
 *  Retrieves all records from the database.
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
export async function getPublicPostOfRole(role) {
	try {
		const res = await fetch("/api/posts/public/role", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				forField: role,
			}),
		});
		const data = await res.json();

		if (!res.ok) {
			throw new Error(
				data.message || "Не удалось получить список постов"
			);
		}

		// console.log("Список постов получен:", data.posts);
		return data.posts;
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
	}
}
/**
 *  Retrieves all records from the database.
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
export async function getPostForStudent(group) {
	try {
		const res = await fetch("/api/posts/group", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				group: group,
			}),
		});
		const data = await res.json();

		if (!res.ok) {
			throw new Error(
				data.message || "Не удалось получить список постов"
			);
		}

		// console.log("Список постов получен:", data.posts);
		return data.posts;
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
	}
}

/**
 *  Retrieves all records from the database.
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
export async function getPostsForVisible(forField) {
	try {
		const res = await fetch("/api/posts/visible", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				forField: forField,
			}),
		});
		const data = await res.json();
		if (!res.ok) {
			throw new Error(
				data.message || "Не удалось получить список постов"
			);
		}
		return data.posts;
	} catch (error) {
		console.error("Ошибка при получении списка постов:", error);
	}
}

/**
 * Updates the content of an existing post in the database.
 * @param {string} postId
 * @param {string} updateName
 * @param {string} updateText
 * @param {string} updateForFieled
 * @param {string} updateVisible
 * @returns Returns a promise that resolves to true if the post was successfully updated, or false if the update failed.
 */
export const updatePost = async (postId, updateName, updateText, updateForFieled, updateVisible, updateForGroup) => {
	try {
		const res = await fetch(`/api/posts/update/${postId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: postId,
				name: updateName,
				text: updateText,
				forField: updateForFieled,
				visible: updateVisible,
				group: updateForGroup,
			}),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
		return false;
	}
};


/**
 *  Adds a new post to the database.
 * @param {string} newName
 * @param {string} newText
 * @param {string} forField
 * @param {string} visible
 */
export async function addPost(newName, newText, forField, visible, group) {
	fetch("/api/posts/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: newName,
			text: newText,
			forField: forField,
			visible: visible,
			group: group,
		}),
	})
		.then((response) => response.json())
	// .then((data) => console.log(data));
}
export async function addPostWithImage(data) {
	fetch("/api/posts/addWithImage", {
		method: "POST",
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// },
		body: data
	})
		.then((response) => response.json())
}
export async function addVisitor() {
	fetch("/api/visitors/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}
	})
}

/**
 * Deletes a post from the database.
 * @param {string} id
 * @returns  bool: True if the post was successfully deleted, False otherwise.
 */
export async function deletePost(id) {
	try {
		const response = await fetch(`/api/posts/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

/**
 *  Retrieves all records from the database.
 * @returns list: A list of dictionaries, where each dictionary represents a record from the database.
 */
export async function getUsers() {
	try {
		const response = await fetch("/api/users");
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить список пользователей"
			);
		}
		// console.log("Список пользователей получен:", data.users);
		return data.users;
	} catch (error) {
		console.error("Ошибка при получении списка пользователей:", error);
	}
}

/**
 * Updates the content of an existing user in the database.
 * @param {string} postId
 * @param {string} updateEmail
 * @param {string} updatePassword
 * @returns Returns a promise that resolves to true if the user was successfully updated, or false if the update failed.
 */
export const updateUser = async (postId, updateEmail, updatePassword) => {
	try {
		const res = await fetch(`/api/users/update/${postId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: postId,
				email: updateEmail,
				password: updatePassword,
			}),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

/**
 *  Adds a new user to the database.
 * @param {string} newEmail
 * @param {string} newPassword
 */
export async function addUser(newEmail, newPassword) {
	fetch("/api/users/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: newEmail,
			password: newPassword,
		}),
	})
		.then((response) => response.json())
	// .then((data) => console.log(data));
}

/**
 * Deletes a user from the database.
 * @param {string} id
 * @returns  bool: True if the user was successfully deleted, False otherwise.
 */
export async function deleteUser(id) {
	try {
		const response = await fetch(`/api/users/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

/**
 *  Find user by email, password, api
 * @returns bool: True if the user was finded, False otherwise.
 */
export async function findUser(email, password) {
	try {
		const res = await fetch(`/api/users/find`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "put error");
		if (data.response) {
			return true;
		}
		return false;
	} catch (err) {
		return false;
	}
}

export async function getVisitorsCount() {
	try {
		const response = await fetch("/api/visitors/all");
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить  колличество посетителей"
			);
		}
		return data.data;
	} catch (error) {
		console.error("Ошибка при получении колличества посетителей:", error);
	}
}

export async function getVisitsTeacher() {
	try {
		const response = await fetch("/api/teacher/visit/all");
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить  колличество посетителей"
			);
		}
		return data.totalVisits;
	} catch (error) {
		console.error("Ошибка при получении колличества посетителей:", error);
	}
}

export async function getTeacherVisits(teacherEmail) {
	try {
		const response = await fetch("/api/teacher/visitors", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: teacherEmail
			}),
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить  колличество посетителей"
			);
		}
		return data.countVisit;
	} catch (error) {
		console.error("Ошибка при получении колличества посетителей:", error);
	}
}

export const updateTeacherVisit = async (emailTeacher, countVisit) => {
	try {
		const res = await fetch(`/api/teacher/visit/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: emailTeacher,
				countVisit: countVisit,
			}),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export async function getCities() {
	try {
		const response = await fetch("/api/cities");
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить города"
			);
		};

		return data.cities;
	} catch (error) {
		console.error("Ошибка при получении городов:", error);
	}
}

export async function addCity(name) {
	fetch("/api/cities/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name:name
		}),
	})
		.then((response) => response.json())
}

export const updateCity = async (id,name) => {
	try {
		const res = await fetch(`/api/cities/update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				name: name,
			}),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export async function deleteCity(id) {
	try {
		const response = await fetch(`/api/cities/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function getStudentGroups() {
	try {
		const response = await fetch("/api/student/groups");
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data.message || "Не удалось получить  колличество посетителей"
			);
		};

		return data.groups;
	} catch (error) {
		console.error("Ошибка при получении колличества ст:", error);
	}
}

export async function addGroup(name) {
	fetch("/api/student/groups/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name:name
		}),
	})
		.then((response) => response.json())
}

export const updateGroup = async (id,name) => {
	try {
		const res = await fetch(`/api/student/groups/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				name: name,
			}),
		});
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export async function deleteGroup(id) {
	try {
		const response = await fetch(`/api/student/groups/delete/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.message || "put error");
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}