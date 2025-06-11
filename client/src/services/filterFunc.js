export const filterPost = (text, posts, fields = ['title', 'content']) => {
    if (!text?.trim()) return posts;

    const searchTerms = text.toLowerCase().split(/\s+/).filter(Boolean);
    if (!searchTerms.length) return posts;

    return posts.filter(post => {
        const fieldValues = fields.map(f =>
            String(post[f] || '').toLowerCase()
        ).join(' ');

        return searchTerms.every(term =>
            fieldValues.includes(term)
        );
    });
};
export const filterUser = (text, users) => {
    if (!text) {
        return users;
    }
    const regex = new RegExp(`(^|\\s)${text}`, "iu");
    return users.filter(({ email }) => regex.test(email.toLowerCase()));
};