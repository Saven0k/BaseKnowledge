import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "accesskey";


export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        const user = jwt.verify(token, ACCESS_SECRET)
        req.user = user;
        next()
    } catch {
        res.sendStatus(403);
        return;
    }
}