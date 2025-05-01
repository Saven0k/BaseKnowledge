export const filterPost = (text, posts) => {
    if (!text) {
        return posts;
    }
    const regex = new RegExp(`(^|\\s)${text}`, "iu");
    return posts.filter(({ name }) => regex.test(name.toLowerCase()));
};
export const filterUser = (text, users) => {
    if (!text) {
        return users;
    }
    const regex = new RegExp(`(^|\\s)${text}`, "iu");
    return users.filter(({ email }) => regex.test(email.toLowerCase()));
};