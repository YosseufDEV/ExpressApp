import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if(req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if(!token) {
        return res.status(401).json({ error: "Unauthorized, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

    } catch(err) {
        return res.status(401).json({ error: "Unauthorized, Invalid token" });
    }

    next();
}
